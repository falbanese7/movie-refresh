const userInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const video = document.getElementById('trailer');
const reviews = document.getElementById('reviews');
const videoLink = document.getElementById('youtube-link');

function getSearchResult() {
    const searchAPI = 'https://api.themoviedb.org/3/search/movie?api_key=1bc4ec58dc00c942690743be433f730d&language=en-US&query='+userInput.value+'&page=1&include_adult=false';
    
        fetch(searchAPI)
        .then((result) => {
            return(result.json())
        }).then((data)=> {
            renderMovieInfo(data)
            video.innerHTML = '';
            let title = data.results[0].title;
            const movieTitle = document.createElement('h2');
            movieTitle.textContent = 'Showing video results for: ' + title;
            movieTitle.setAttribute('class', 'title is-2')
            video.appendChild(movieTitle);
        })
}

function renderMovieInfo(data) {
    const movieData = data;
    const movieID = movieData.results[0].id
    const tmdbVideoAPI = 'https://api.themoviedb.org/3/movie/'+movieID+'/videos?api_key=1bc4ec58dc00c942690743be433f730d&language=en-US'
    const tmdbReviewAPI = 'https://api.themoviedb.org/3/movie/'+movieID+'/reviews?api_key=1bc4ec58dc00c942690743be433f730d&language=en-US&page=1'

    fetch(tmdbVideoAPI)
        .then((result) => {
            return(result.json())
        }).then((data)=> {
            renderVideo(data);
        })

        fetch(tmdbReviewAPI)
        .then((result) => {
            return(result.json())
        }).then((data)=> {
            reviews.innerHTML = '';
            const reviewTitle = document.createElement('h2');
            reviewTitle.textContent = 'Viewer Reviews';
            reviewTitle.setAttribute('class', 'title is-2 mt-3');
            reviews.append(reviewTitle);
            reviews.setAttribute('class', 'column p-1 m-2 add-border');
            reviews.style['border-left'] = 'solid black 5px';
            
            for (i=0; i < data.results.length; i++){
                let author =  document.createElement('h5');
                author.setAttribute('class', "title is-5 mt-4");
                author.textContent = 'Review #' + (i+1) + ': ' + data.results[i].author;
                let review = document.createElement('p');
                review.textContent = data.results[i].content;
                reviews.append(author, review);
            } 
        })
}

function renderVideo(data) {
    const videoData = data;
   
    for (let i=0; i < videoData.results.length; i++){
        let youtubeID = videoData.results[i].key;
        let title = videoData.results[i].title;
    
        let movieTitle = document.createElement('h2');
        movieTitle.textContent = title;

        let youtubeAPI = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id='+youtubeID+'&key=AIzaSyBD_G6CwLIRwiOxUT6JVCwO5OLihLFTzN8'
            fetch(youtubeAPI)
            .then((result) => {
                return(result.json())
            }).then((data)=> {
                let vidLink = document.createElement('iframe')
                vidLink.src = 'https://youtube.com/embed/' + data.items[0].id;
                vidLink.setAttribute('width', '720');
                vidLink.setAttribute('height', '480');
               
                
                
                let vid = data.items[0].snippet.title;
                let vidTitle = document.createElement('h4');
                vidTitle.setAttribute('class', 'title is-4');
                vidTitle.textContent = vid;
                video.append(vidTitle, vidLink)
    
        })
    }
}

function handleSearchSubmit(event) {
    event.preventDefault();

    if (!userInput) {
        alert(response.message)
    }
    getSearchResult();
}

searchBtn.addEventListener('click', handleSearchSubmit);