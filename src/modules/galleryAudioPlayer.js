import birdsData from './birdsDataRu';
import { insertBirdGallery } from './insertBirdGallery';
import { logo, firstNav, gameNav } from '../index';

let birdsArr = [
  ...birdsData[0],
  ...birdsData[1],
  ...birdsData[2],
  ...birdsData[3],
  ...birdsData[4],
  ...birdsData[5],
];

let birdIndex = 0;
let currBird = getCurrBird();

const playPauseBtn = document.querySelector('#gallery-play');
const seekSlider = document.querySelector('#gallery-seek-slider');
const soundBtn = document.querySelector('#gallery-sound');
const volumeSlider = document.querySelector('#gallery-volume-slider');
const currTime = document.querySelector('#gallery-curr-time');
const totalDuration = document.querySelector('#gallery-total-duration');
const prevArrow = document.querySelector('.arrows__prev-arrow');
const nextArrow = document.querySelector('.arrows__next-arrow');

let isPlaying = false;
let isMute = false;
let updateTimer;

const audio3 = new Audio();

playPauseBtn.addEventListener('click', playPauseTrack);
seekSlider.addEventListener('change', seekTo);
volumeSlider.addEventListener('change', setVolume);
soundBtn.addEventListener('click', toggleSound);
prevArrow.addEventListener('click', prevBird);
nextArrow.addEventListener('click', nextBird);

document.addEventListener('click', (e) => {
  if (
    e.target == logo ||
    e.target == firstNav ||
    e.target == gameNav ||
    logo.contains(e.target)
  )
    reset();
});

function getCurrBird() {
  return birdsArr[birdIndex];
}

insertBirdGallery(currBird);

function checkArr() {
  if (birdIndex > birdsArr.length - 1) birdIndex = 0;
  if (birdIndex < 0) birdIndex = birdsArr.length - 1;
}

function prevBird() {
  birdIndex--;
  checkArr();
  currBird = getCurrBird();
  reset();
  insertBirdGallery(currBird);
}

function nextBird() {
  birdIndex++;
  checkArr();
  currBird = getCurrBird();
  reset();
  insertBirdGallery(currBird);
}

function loadTrack(currBird) {
  audio3.src = currBird.audio;
  audio3.load();
}
loadTrack(currBird);

audio3.addEventListener(
  'loadeddata',
  () => {
    totalDuration.textContent = getTimeCode();
  },
  false
);

function getTimeCode() {
  let durationMinutes = Math.floor(audio3.duration / 60);
  let durationSeconds = Math.floor(audio3.duration - durationMinutes * 60);

  if (durationSeconds < 10) {
    durationSeconds = '0' + durationSeconds;
  }

  if (durationMinutes < 10) {
    durationMinutes = '0' + durationMinutes;
  }

  return (totalDuration.textContent = durationMinutes + ':' + durationSeconds);
}
function reset() {
  isPlaying = false;
  playPauseBtn.classList.remove('pause');
  clearInterval(updateTimer);
  currTime.textContent = '00:00';
  seekSlider.value = 0;
  loadTrack(currBird);
}

function playPauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  loadTrack(currBird);
  updateTimer = setInterval(setUpdate, 1000);
  audio3.play();
  isPlaying = true;
  playPauseBtn.classList.add('pause');
  setUpdate();
}

function pauseTrack() {
  audio3.pause();
  isPlaying = false;
  playPauseBtn.classList.remove('pause');
}

function seekTo() {
  let seekto = audio3.duration * (seekSlider.value / 100);
  audio3.currentTime = seekto;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(audio3.duration)) {
    seekPosition = audio3.currentTime * (100 / audio3.duration);
    seekSlider.value = seekPosition;

    let currentMinutes = Math.floor(audio3.currentTime / 60);
    let currentSeconds = Math.ceil(audio3.currentTime - currentMinutes * 60);

    if (currentSeconds < 10) {
      currentSeconds = '0' + currentSeconds;
    }

    if (currentMinutes < 10) {
      currentMinutes = '0' + currentMinutes;
    }

    currTime.textContent = currentMinutes + ':' + currentSeconds;

    if (currTime.textContent === totalDuration.textContent) reset(currTime);
  }
}

function setVolume() {
  audio3.volume = volumeSlider.value / 100;
}

function toggleSound() {
  if (!isMute) {
    audio3.volume = 0;
    isMute = true;
    soundBtn.classList.toggle('off');
    volumeSlider.classList.toggle('none');
  } else {
    isMute = false;
    audio3.volume = volumeSlider.value / 100;
    soundBtn.classList.toggle('off');
    volumeSlider.classList.toggle('none');
  }
}

export { loadTrack, pauseTrack };
