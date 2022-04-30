const video = document.getElementById('youtube-video');
const videoLink = document.getElementById('youtube-link');

fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=goat7QZohhc&key=AIzaSyBD_G6CwLIRwiOxUT6JVCwO5OLihLFTzN8')
 .then((result) => {
    return(result.json())
 }).then((data)=> {
     console.log(data)
     const thumbImg = document.createElement('img');
     thumbImg.setAttribute('src', data.items[0].snippet.thumbnails.default.url);

     
     videoLink.innerHTML = '<a href=' + 'https://youtube.com/watch?v=' + data.items[0].id + ' target=_blank' + '>' + 'Watch on YouTube'
     
     
     const vid = data.items[0].snippet.title;
     video.innerHTML = vid;
     video.appendChild(thumbImg)
 })

//  fetch('https://api.themoviedb.org/3/movie/76341?api_key=1bc4ec58dc00c942690743be433f730d')
//   .then((result) => {
//       return(result.json())
//   }).then((data)=> {
//       console.log(data)
//   })