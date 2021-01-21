import { serverURL, carousel, olElement, carouselContainer } from './constans.js'

export function getArtist(event) {
    event.preventDefault();

    const artist = document.querySelector('[name="artist"]').value.toLowerCase();
    const query = artist.replace(/\s/g, '+');
    
    getVideos(query);
}

function getVideos(query) {
    fetch(`${serverURL}${query}`)
    .then(response => response.json())
    .then(result => {
        const {results: tracks} = result;
        window.tracks = tracks;
        
        carouselContainer.style.display= 'block';
        carousel.innerHTML = " ";
        olElement.innerHTML = " ";
        
        tracks.forEach(element => addTrack(element, tracks.indexOf(element)));
    })
    .catch(error => console.error(error));
}

export function addTrack(item, number) {
    const {previewUrl: preview, trackId, trackViewUrl, artistName, trackName} = item;

    if (!preview) return;
    
    const query = document.querySelector('[name="artist"]').value;
    document.querySelector('h2').innerHTML = "";
    document.querySelector('h2').innerText = `Видео по запросу "${query}"`;
    
    const element = document.createElement('div');
    element.classList.add('item');
    if(!document.querySelector('.active')) element.classList.add('active');

    const videoNode = document.createElement('video');
    videoNode.setAttribute('controls', 'controls');
    videoNode.style.width = "100%";

    const source = document.createElement('source');  
    source.setAttribute('src', trackViewUrl);
    source.setAttribute('src', preview);
    source.setAttribute('type', 'video/mp4');
    source.setAttribute('data-id', trackId);
    
    
    
    const description =  document.createElement('div');
    description.classList.add('carousel-caption');

    const title = document.createElement('h3');
    title.innerText = trackName;
    
    const artist = document.createElement('p');
    artist.innerText = artistName;



    const liItem = document.createElement('li');
    liItem.setAttribute('data-target', '#myCarousel');
    liItem.setAttribute('data-slide-to', number);

    olElement.appendChild(liItem);
    videoNode.appendChild(source);
    element.appendChild(videoNode);
    description.appendChild(title);
    description.appendChild(artist);
    element.appendChild(description);
    carousel.appendChild(element);
}

