import { currBird } from '../index';

const playPauseBtn2 = document.querySelector('#play-2');
const seekSlider2 = document.querySelector('#seek-slider-2');
const soundBtn2 = document.querySelector('#sound-2');
const volumeSlider2 = document.querySelector('#volume-slider-2');
const currTime2 = document.querySelector('#curr-time-2');
const totalDuration2 = document.querySelector('#total-duration-2');

let isPlaying = false;
let isMute = false;
let updateTimer;

const audio2 = new Audio();

playPauseBtn2.addEventListener('click', playPauseTrack);
seekSlider2.addEventListener('click', seekTo);
volumeSlider2.addEventListener('click', setVolume);
soundBtn2.addEventListener('click', toggleSound);

function loadTrack(currBird) {
  audio2.src = currBird.audio;
  audio2.load();
}

function reset() {
  isPlaying = false;
  playPauseBtn2.classList.remove('pause');
  clearInterval(updateTimer);
  currTime2.textContent = '00:00';
  seekSlider2.value = 0;
  loadTrack(currBird);
}

function playPauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  loadTrack(currBird);
  updateTimer = setInterval(setUpdate, 1000);
  audio2.play();
  isPlaying = true;
  playPauseBtn2.classList.add('pause');
  setUpdate();
}

function pauseTrack() {
  audio2.pause();
  isPlaying = false;
  playPauseBtn2.classList.remove('pause');
}

function seekTo() {
  let seekto = audio2.duration * (seekSlider2.value / 100);
  audio2.currentTime = seekto;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(audio2.duration)) {
    seekPosition = audio2.currentTime * (100 / audio2.duration);
    seekSlider2.value = seekPosition;

    let currentMinutes = Math.floor(audio2.currentTime / 60);
    let currentSeconds = Math.ceil(audio2.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(audio2.duration / 60);
    let durationSeconds = Math.floor(audio2.duration - durationMinutes * 60);

    if (currentSeconds < 10) {
      currentSeconds = '0' + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = '0' + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = '0' + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = '0' + durationMinutes;
    }

    currTime2.textContent = currentMinutes + ':' + currentSeconds;
    totalDuration2.textContent = durationMinutes + ':' + durationSeconds;

    if (currTime2.textContent === totalDuration2.textContent) reset(currTime2);
  }
}

function setVolume() {
  audio2.volume = volumeSlider2.value / 100;
}

function toggleSound() {
  if (!isMute) {
    audio2.volume = 0;
    isMute = true;
    soundBtn2.classList.toggle('off');
    volumeSlider2.classList.toggle('none');
  } else {
    isMute = false;
    audio2.volume = volumeSlider2.value / 100;
    soundBtn2.classList.toggle('off');
    volumeSlider2.classList.toggle('none');
  }
}

export { loadTrack, pauseTrack }