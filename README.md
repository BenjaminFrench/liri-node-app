# liri-node-app
Node CLI program that uses Twitter, Spotify, and OMDB APIs.

## Usage
### Twitter
`
node liri.js my-tweets
`

Returns the last 25 tweets by user
### Spotify
`
node liri.js spotify-this-song <'song-title'>
`

Searches for song and returns info. Defaults to The Sign by Ace of Base if no song is specified.
### OMDB
`
node liri.js movie-this <'movie-title'>
`

Searches for movie and returns info. Defaults to Mr. Nobody if no movie is specified.
### Read command(s) from file
`
node liri.js do-what-it-says
`

* Reads random.txt and executes the commands.
* Can read multiple lines of commands.
* Each command should be on a new line.
* If a command is being given an argument, there must be a comma between the command and argument. The argument must be in regular quotes, not single.
