require("dotenv").config();


var keys = require("./keys.js");
// console.log(keys);

var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

var command = process.argv[2]
var axios = require("axios")
var moment = require("moment");
var fs = require('fs')
var arg = process.argv;
var input = "";
for (var i = 3; i < arg.length; i++) {

    if (i > 3 && i < arg.length) {
        input = input + "+" + arg[i];
    }
    else {
        input += arg[i];

    }
}
console.log(input);
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
//look at not inputting a string//
function liri() {
    if (command === "spotify-this-song") {
        if (input === ""){
            input = "The Sign"
        }
        console.log("spotify-this-song");
        spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("Artists; " + data.tracks.items[0].album.artists[0].name);
            console.log("Songs name: " + data.tracks.items[0].name);
            console.log("Album name: " + data.tracks.items[0].album.name);
            console.log("Preview link: " + data.tracks.items[0].preview_url)
            console.log("\n----------\n");
        });
    }
    else if (command === "movie-this") {
        if (input === ""){
            input = "Mr Nobody"
        }
        //    * Title of the movie.
        //    * Year the movie came out.
        //    * IMDB Rating of the movie.
        //    * Rotten Tomatoes Rating of the movie.
        //    * Country where the movie was produced.
        //    * Language of the movie.
        //    * Plot of the movie.
        //    * Actors in the movie.

        axios.get("http://www.omdbapi.com/?t=" + input + "&apikey=trilogy").then(
            function (response) {

                console.log("The Title of the movie: " + response.data.Title);
                console.log("Year released: " + response.data.Year);
                console.log("IMDB rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
                console.log("Country where movie was produced: " + response.data.Country);
                console.log("Language of the Movie: " + response.data.Language);
                console.log("Plot of the movie: " + response.data.Plot);
                console.log("Actors in the movie: " + response.data.Actors);
                console.log("\n----------\n");
            }
        );
    }
    else if (command === "concert-this") {
        // Name of the venue
        // Venue location
        // Date of the Event (use moment to format this as "MM/DD/YYYY")
        axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(function (results) {
            console.log(results.data[0].venue.name);
            console.log(results.data[0].venue.city);
            // console.log(results.data[0].datetime);
            console.log(moment(results.data[0].datetime, "YYYY-MM-DDTHH:mm:ss").format("MM-DD-YYYY"));
            console.log("\n----------\n");
        })
    }
    else if (command === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var arr = data.split(",")
            console.log(data.split(","));
            command = arr[0]
            input = arr[1]
            liri()
        });
    }
}
liri()