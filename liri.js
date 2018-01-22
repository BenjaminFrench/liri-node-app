// Load API keys from file
keys = require('./keys.js');

// Load Twitter, Spotify, and Requests modules
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// Initialize Spotify client
var spotifyClient = new Spotify({
    id: keys.spotifyKeys.client_id,
    secret: keys.spotifyKeys.client_secret
});

// Initialize Twitter client
var twitterClient = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});