// Load API keys from file
keys = require('./keys.js');

// Load Twitter, Spotify, and Requests modules
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// Command is first argument
var command = args[0];

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
            console.log(error);
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

// Initialize Spotify client
var spotifyClient = new Spotify({
    id: keys.spotifyKeys.client_id,
    secret: keys.spotifyKeys.client_secret
});
