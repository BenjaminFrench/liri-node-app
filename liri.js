// Load API keys from file
keys = require('./keys.js');

// Load FS, Twitter, Spotify, and Requests modules
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// Command is first argument
var command = process.argv[2];

// Console log and write to log.txt
// Uses synchronous version of appendFile so that proper order is preserved
function logToConsoleAndFile(text) {
    console.log(text);
    text += '\n';
    try {
        fs.appendFileSync('./log.txt', text);
    }
    catch (error) {
        return console.log(error);
    }
}

function myTweets() {
    // Initialize Twitter client
    var twitterClient = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    // Call twitter API and get my 25 most recent tweets
    twitterClient.get('statuses/user_timeline', { user_id: 'Ben38192128', count: 25 }, function (error, tweets, response) {
        if (error) {
            return logToConsoleAndFile(error);
        }
        else {
            // Log time and text of each tweet
            tweets.forEach((element, index) => {
                logToConsoleAndFile('Tweet #' + (index+1));
                logToConsoleAndFile('Created at ' + element.created_at);
                logToConsoleAndFile(element.text);
                logToConsoleAndFile('');
            });
        }
    });
}

function spotifyThisSong(song) {
    // Initialize Spotify client
    var spotifyClient = new Spotify({
        id: keys.spotifyKeys.client_id,
        secret: keys.spotifyKeys.client_secret
    });

    // Search api for track
    spotifyClient.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
        if (err) {
            return logToConsoleAndFile('Error occurred: ' + err);
        }
        var title = data.tracks.items[0].name;
        var artist = data.tracks.items[0].artists[0].name;
        var album = data.tracks.items[0].album.name;
        var link = data.tracks.items[0].preview_url;

        logToConsoleAndFile(`Song name: ${title}`);
        logToConsoleAndFile(`Artist: ${artist}`);
        logToConsoleAndFile(`Album: ${album}`);
        logToConsoleAndFile(`Preview URL: ${link}`);
        logToConsoleAndFile('');
    });
}

function movieThis(movie) {
    request(`http://www.omdbapi.com/?apikey=${keys.omdbKeys.api_key}&t=${movie}`, function (error, response, body) {
        if (error) {
            return logToConsoleAndFile(error);
        }
        var movieObj = JSON.parse(body);

        logToConsoleAndFile(movieObj.Title);
        logToConsoleAndFile(movieObj.Year);
        logToConsoleAndFile('IMDB Rating: ' + movieObj.Ratings[0].Value);
        logToConsoleAndFile('RT Rating: ' + movieObj.Ratings[1].Value);
        logToConsoleAndFile(movieObj.Country);
        logToConsoleAndFile(movieObj.Language);
        logToConsoleAndFile(movieObj.Plot);
        logToConsoleAndFile(movieObj.Actors);
        logToConsoleAndFile('');
    });
}

if (command === 'my-tweets') {
    myTweets();
}

else if (command === 'spotify-this-song') {
    // Check if song name was provided, otherwise use default value
    var song = '';
    if (process.argv[3]) {
        song = process.argv[3];
    }
    else {
        song = 'track:The Sign artist:Ace of Base';
    }
    
    spotifyThisSong(song);
}

else if (command === 'movie-this') {
    var movie = '';
    if (process.argv[3]) {
        movie = process.argv[3];
    }
    else {
        movie = 'Mr. Nobody';
    }
    
    movieThis(movie);
}

else if (command === 'do-what-it-says') {
    fs.readFile('random.txt', 'utf8', function (error, data) {

        if (error) {
            return logToConsoleAndFile(error);
        }

        // Then split it by new lines
        var dataArr = data.split('\n');

        // console.log(dataArr);
        dataArr.forEach((element, index, array) => {
            // Call liri again with the parameters in the file
            var commandFromFile = element.split(',');
            if (commandFromFile[0] === 'my-tweets') {
                myTweets();
            }

            else if (commandFromFile[0] === 'spotify-this-song') {
                spotifyThisSong(commandFromFile[1].replace(/(")/g, ''));
            }

            else if (commandFromFile[0] === 'movie-this') {
                movieThis(commandFromFile[1].replace(/(")/g, ''));
            }    
        });
        
    });
}