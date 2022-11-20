const birdName = document.querySelector('#gallery-bird-name');
const birdImg = document.querySelector('#gallery-bird-img');
const birdSpecies = document.querySelector('#gallery-bird-species');
const descr = document.querySelector('#gallery-descr');

export function insertBirdGallery(currBird) {
  birdImg.style.background = `url(${currBird.image}) center center/cover no-repeat`;
  birdName.textContent = currBird.name;
  birdSpecies.textContent = currBird.species;
  descr.innerHTML = currBird.description;
}