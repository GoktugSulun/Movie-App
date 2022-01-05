const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=873d83c0aabf908d0ecd1b5924d1079f&page=1`;
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=873d83c0aabf908d0ecd1b5924d1079f&query="`;

const form = document.getElementById('form');
const input = document.querySelector('.search');
const containerEl = document.querySelector('.container');

getMovies(API_URL);

async function getMovies(url){
   const res = await fetch(url)
   const data = await res.json();

   showMovies(data.results);
   console.log(data.results);
}

form.addEventListener('submit', (e) => {
   e.preventDefault();

   const searchTerm = input.value;
   console.log(searchTerm);

   if(searchTerm && searchTerm !== ''){
      getMovies(SEARCH_API + searchTerm);
      input.value = '';
   }else {
      window.location.reload();
   }

  
});

function showMovies(movies){

   containerEl.innerHTML = '';

   for(let i=0; i<movies.length; i++){
      
      let filmCard = document.createElement('DIV');
      filmCard.classList.add('film-card');

      filmCard.innerHTML = 
         `<img class="img" src="${IMG_PATH + movies[i].poster_path}" alt="">
            <div class="film-details">
               <div class="film-name">
               <span class="name">
                  ${movies[i].original_title}
               </span>
               </div>
               <div class="film-rate">
                  <span class="rate">
                     ${movies[i].vote_average}
                  </span>
               </div>
            </div>
            <div class="summary">
               <h4> Overview </h4>
               <p> ${movies[i].overview} </p>
            </div>
            `
      
      containerEl.appendChild(filmCard);
   }

}