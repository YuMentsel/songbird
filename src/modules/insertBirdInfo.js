const birdImg = document.querySelector('#bird-img');
const birdName = document.querySelector('#bird-name');
const player2 = document.querySelector('#player-2');
const birdImg2 = document.querySelector('#bird-img-2');
const birdName2 = document.querySelector('#bird-name-2');
const birdSpecies = document.querySelector('#bird-species-2');
const descr = document.querySelector('#descr');

export function insertBirdInfo(isTrueAnswer, currBird) {
  if (isTrueAnswer) {
    player2.classList.remove('none');
    birdImg.style.background = `url(${currBird.image}) center center/cover no-repeat`;
    birdName.textContent = currBird.name;
    birdImg2.style.background = `url(${currBird.image}) center center/cover no-repeat`;
    birdName2.textContent = currBird.name;
    birdSpecies.textContent = currBird.species;
    descr.innerHTML = currBird.description;
  } else {
    player2.classList.add('none');
    birdImg.style.background = '';
    birdName.textContent = '****************';
    descr.innerHTML = 'Послушайте плеер. <br> Выберите птицу из списка.';
  }
}
