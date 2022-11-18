import { currBird } from '../index';

const playPauseBtn = document.querySelector('#play');
const seekSlider = document.querySelector('#seek-slider');
const soundBtn = document.querySelector('#sound');
const volumeSlider = document.querySelector('#volume-slider');
const currTime = document.querySelector('#curr-time');
const totalDuration = document.querySelector('#total-duration');

let isPlaying = false;
let isMute = false;
let updateTimer;

const audio1 = new Audio();

playPauseBtn.addEventListener('click', playPauseTrack);
seekSlider.addEventListener('click', seekTo);
volumeSlider.addEventListener('click', setVolume);
soundBtn.addEventListener('click', toggleSound);

function loadTrack(currBird) {
  audio1.src = currBird.audio;
  audio1.load();
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
  updateTimer = setInterval(setUpdate, 1000);
  audio1.play();
  isPlaying = true;
  playPauseBtn.classList.add('pause');
  setUpdate();
}

function pauseTrack() {
  audio1.pause();
  isPlaying = false;
  playPauseBtn.classList.remove('pause');
}

function seekTo() {
  let seekto = audio1.duration * (seekSlider.value / 100);
  audio1.currentTime = seekto;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(audio1.duration)) {
    seekPosition = audio1.currentTime * (100 / audio1.duration);
    seekSlider.value = seekPosition;

    let currentMinutes = Math.floor(audio1.currentTime / 60);
    let currentSeconds = Math.ceil(audio1.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(audio1.duration / 60);
    let durationSeconds = Math.floor(audio1.duration - durationMinutes * 60);

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

    currTime.textContent = currentMinutes + ':' + currentSeconds;
    totalDuration.textContent = durationMinutes + ':' + durationSeconds;

    if (currTime.textContent === totalDuration.textContent) reset(currTime);
  }
}

function setVolume() {
  audio1.volume = volumeSlider.value / 100;
}

function toggleSound() {
  if (!isMute) {
    audio1.volume = 0;
    isMute = true;
    soundBtn.classList.toggle('off');
    volumeSlider.classList.toggle('none');
  } else {
    isMute = false;
    audio1.volume = volumeSlider.value / 100;
    soundBtn.classList.toggle('off');
    volumeSlider.classList.toggle('none');
  }
}

export { loadTrack, pauseTrack }