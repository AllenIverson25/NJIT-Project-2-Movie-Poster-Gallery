/* SITE.JS: THIS FILE CONTAINS THE METHODS/FUNCTIONS AND VARIABLES CONTROLLING YOUR SITE */

const vue_app = Vue.createApp({
      created () {
            fetch('movies.json').then(response => response.json()).then(json => {
                  this.movies = json
            })
      },
      mounted() {
            // Initialize 3D Parallax Tilt Effect
            this.init3DParallax()
      },
      data() {
        return {
            movies: [],
            title: "IMDB + Joseph Friedman's Top 8 Movies",
            owner: "Joseph Friedman",
            github: "https://github.com/AllenIverson25/NJIT-Project-2-Movie-Poster-Gallery"
      }
    },
      methods: {
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
            },
            
            // 3D PARALLAX TILT EFFECT
            init3DParallax() {
                  // Wait a bit for Vue to render the cards
                  setTimeout(() => {
                        const cards = document.querySelectorAll('.thumbnail');
                        
                        cards.forEach(card => {
                              card.addEventListener('mousemove', (e) => {
                                    const rect = card.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    
                                    const centerX = rect.width / 2;
                                    const centerY = rect.height / 2;
                                    
                                    // Reduced rotation from /25 to /40 for even more subtlety
                                    const rotateX = (y - centerY) / 40;
                                    const rotateY = (centerX - x) / 40;
                                    
                                    // Reduced scale from 1.02 to 1.01
                                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
                              });
                              
                              card.addEventListener('mouseleave', () => {
                                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                              });
                        });
                  }, 500);
            }
      }
})

vue_app.mount("#vue_app")
