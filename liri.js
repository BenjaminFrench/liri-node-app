// Load API keys from file
keys = require('./keys.js');

// Load Twitter, Spotify, and Requests modules
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// Command is first argument
var command = process.argv[2];

if (command === 'my-tweets') {
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
            return(error);
        }
        else {
            // Log time and text of each tweet
            tweets.forEach((element, index) => {
                console.log('Tweet #' + (index+1));
                console.log('Created at', element.created_at);
                console.log(element.text);
                console.log();
            });
        }
    });
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
    // Initialize Spotify client
    var spotifyClient = new Spotify({
        id: keys.spotifyKeys.client_id,
        secret: keys.spotifyKeys.client_secret
    });

    // Search api for track
    spotifyClient.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var title = data.tracks.items[0].name;
        var artist = data.tracks.items[0].artists[0].name;
        var album = data.tracks.items[0].album.name;
        var link = data.tracks.items[0].preview_url;

        console.log(`Song name: ${title}`);
        console.log(`Artist: ${artist}`);
        console.log(`Album: ${album}`);
        console.log(`Preview URL: ${link}`);
    });
}

else if (command === 'movie-this') {
    var movie = '';
    if (process.argv[3]) {
        movie = process.argv[3];
    }
    else {
        movie = 'Mr. Nobody';
    }
    request(`http://www.omdbapi.com/?apikey=${keys.omdbKeys.api_key}&t=${movie}`, function (error, response, body) {
        if (error) {
            return error;
        }
        var movieObj = JSON.parse(body);

        console.log(movieObj.Title);
        console.log(movieObj.Year);
        console.log('IMDB Rating:', movieObj.Ratings[0].Value);
        console.log('RT Rating:', movieObj.Ratings[1].Value);
        console.log(movieObj.Country);
        console.log(movieObj.Language);
        console.log(movieObj.Plot);
        console.log(movieObj.Actors);
    });
}