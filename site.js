/* SITE.JS: THIS FILE CONTAINS THE METHODS/FUNCTIONS AND VARIABLES CONTROLLING YOUR SITE
//
*/

/* NOTE: MOVIES.JSON CONTAINS A LIST OF MOVIES AND ACCOMPANYING METADATA
//
//    They are in the following format:
//    title (String): the name of the movie
//    iscore (Number): the IMDB score
//    rating (String): the movie's MPAA rating
//    released (Array): the release date. Note that the order of the array is:  YYYY, MM, DD
//    country (String): the country of production
//    posters (Array): an array of String values with the URL to movie posters (in your img/ directory)
//    imdb (String): the URL to the corresponding IMDB website
//    website (String): the URL to the corresponding official website
//    likes (Number): a fictitious number of user likes
//    dislikes (Number): a fictitious number of user dislikes
//    posterindex (Number): a counter to use with the "posters" array to keep track of the current displayed poster index
//
// FOR STEP 16, ADD THREE OF YOUR OWN FAVORITE MOVIES WITH METADATA TO THE END OF THE JSON FILE LIST
*/


const vue_app = Vue.createApp({
      // This automatically imports your movies.json file and puts it into
      //   the variable: movies
      created () {
            fetch('movies.json').then(response => response.json()).then(json => {
                  this.movies = json
            })
      },
      data() {
        return {
            // This holds your movies.json data.
            movies: [],
            /* ADD ADDITIONAL VARIABLES FOR STEP 3 HERE */
            title: "IMDB + Joseph Friedman's Top 8 Movies",
            owner: "Joseph Friedman",
            github: "https://github.com/AllenIverson25/NJIT-Project-2-Movie-Poster-Gallery"
      }
    },
      methods: {
            /* ADD FUNCTIONS/METHODS FOR STEP 7 HERE */
            makeTextDate(dateArray) {
                  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                  return months[dateArray[1] - 1] + " " + dateArray[2] + ", " + dateArray[0];
            },
            like(index) {
                  this.movies[index].likes = this.movies[index].likes + 1;
            },
            dislike(index) {
                  this.movies[index].dislikes = this.movies[index].dislikes + 1;
            },
            posterClick(index) {
                  if (this.movies[index].posterindex < this.movies[index].posters.length - 1) {
                        this.movies[index].posterindex = this.movies[index].posterindex + 1;
                  } else {
                        this.movies[index].posterindex = 0;
                  }
            },
            timeText(minutes) {
                  let hours = Math.floor(minutes / 60);
                  let mins = minutes % 60;
                  return hours + "h " + mins + "m";
            }
      }
})

vue_app.mount("#vue_app")