import './index.html';
import './index.scss';

import birdsData from "./modules/birdsDataRu";

import { random } from './modules/helpers';
import { loadTrack, pauseTrack } from './modules/audioPlayer1';
import { loadTrack2 } from './modules/audioPlayer2';
import './modules/galleryAudioPlayer';
import { getBirdsNames, removeBirdsNames } from './modules/createAnswersList';
import { insertBirdInfo, removeBirdInfo } from'./modules/insertBirdInfo';
import { audioYes, audioNo } from'./modules/setSoud';


const levelNav = document.querySelectorAll('.main .nav__item');
const scoreNum = document.querySelector('.score');

const firstPage = document.querySelector('.first-page');
const mainPage = document.querySelector('.main');
const wonPage = document.querySelector('.won-page');

const answersList = document.querySelector('.answers__list');
const nextLevelBtn = document.querySelector('#next-level');
const newGameBtn = document.querySelector('#new-game');
const newGameBtnFirstPage = document.querySelector('#game-page');
const galleryBtnFirstPage = document.querySelector('#gallery-page');
const wonMessage = document.querySelector('.won-page__message');
const wonMax = document.querySelector('.won-page__max');

const logo = document.querySelector('.logo');
const headerNav = document.querySelector('.nav');
const firstNav = document.querySelector('#first');
const gameNav = document.querySelector('#main');
const galleryNav = document.querySelector('#gallery');
const gallery = document.querySelector('.gallery');


let levelIndex = 0;
let birdIndex = random();
let currBird = updateCurrBird(birdIndex);
let isTrueAnswer = false;
let score = 0;

function updateCurrBird(birdIndex) {
  return birdsData[levelIndex][birdIndex];
}

// Создание списка ответов

let birdNames = getBirdsNames(levelIndex, birdsData, answersList);

// Выбор ответа

let errors = 0;
let responded = false;

answersList.addEventListener('click', (e) => {
  const answer = e.target;
  const answerBird = updateCurrBird(answer.dataset.index);
  if (answer.closest('.answers__answer')) {
    if (answer.textContent === currBird.name) {
      if (!responded) {
        audioYes.play();
        answer.style.color = '#3a6d00';
        answer.classList.add('green');
        isTrueAnswer = true;
        pauseTrack();
        getScore(errors);
        nextLevelBtn.classList.remove('disabled');
        responded = true;
        loadTrack2 (currBird);
      }
    } else {
      if (!responded && !answer.classList.contains('red')) {
        answer.style.color = '#e00038';
        answer.classList.add('red');
        errors += 1;
        audioNo.play();
      }
    }

    insertBirdInfo(isTrueAnswer, responded, answerBird, currBird);
  }
});

// Нажатие на кнопку Next Level

nextLevelBtn.addEventListener('click', changeLevel);

function changeLevel() {
  if (levelIndex > 4) {
    showWonPage();
  } else {
    levelIndex++;
    createNewLevel()
  }
  responded = false;
  removeBirdInfo();
  nextLevelBtn.classList.add('disabled');
}

function createNewLevel() {
  birdIndex = random();
  currBird = updateCurrBird(birdIndex);
  isTrueAnswer = false;
  errors = 0;
  removeBirdsNames();
  birdNames = getBirdsNames(levelIndex, birdsData, answersList);
  insertBirdInfo(isTrueAnswer, responded, currBird);
  loadTrack(currBird);
  changeLevelNav(levelIndex);
}

function changeLevelNav(levelIndex) {
  levelNav.forEach((level) => {
    level.classList.remove('active');
  });
  levelNav[levelIndex].classList.add('active');
}

// Подсчет очков

function getScore(errors) {
  score += 5 - errors;
  setScore();
}

function setScore() {
  scoreNum.textContent = score;
}

// Страница с поздравлением

function showWonPage() {
  if (score == 30) {
    newGameBtn.classList.add('none');
    wonMax.classList.remove('none');
    wonMax.textContent = 'Игра закончена!';
  } else {
    newGameBtn.classList.remove('none');
    wonMax.classList.add('none');
    wonMax.textContent = 'Попробовать еще раз';
  }
  mainPage.classList.add('none');
  wonPage.classList.remove('none');
  firstPage.classList.add('none');
  wonMessage.innerHTML = `
  <span>Поздравляем!</span><br>
  Вы прошли викторину и набрали ${score} из 30 возможных баллов.`;
}

function newGame() {
  mainPage.classList.remove('none');
  wonPage.classList.add('none');
  levelIndex = 0;
  score = 0;
  setScore();
  createNewLevel();
}

// Навигация

function showMainPage() {
  gameNav.classList.add('disabled');
  firstPage.classList.add('none');
  mainPage.classList.remove('none');
  wonPage.classList.add ('none');
  scoreNum.classList.remove('none');
  headerNav.classList.remove('none');
  gallery.classList.add('none');
}

function showFirstPage () {
  gameNav.classList.remove('disabled');
  firstPage.classList.remove('none');
  mainPage.classList.add ('none');
  wonPage.classList.add ('none');
  scoreNum.classList.add('none');
  headerNav.classList.add('none');
  gallery.classList.add('none');
}

function showGallery () {
  gameNav.classList.remove('disabled');
  firstPage.classList.add('none');
  mainPage.classList.add ('none');
  mainPage.classList.add ('none');
  scoreNum.classList.add('none');
  headerNav.classList.remove('none');
  gallery.classList.remove('none');
  wonPage.classList.add ('none');
}

function startNewGame () {
  responded = false;
  removeBirdInfo();
  showMainPage();
  levelIndex = 0;
  score = 0;
  setScore();
  createNewLevel();
  nextLevelBtn.classList.add('disabled');
}

newGameBtnFirstPage.addEventListener('click', startNewGame)
gameNav.addEventListener('click', startNewGame)
newGameBtn.addEventListener('click', newGame)
galleryBtnFirstPage.addEventListener('click', showGallery)
logo.addEventListener('click', showFirstPage)
firstNav.addEventListener('click', showFirstPage)
galleryNav.addEventListener('click', showGallery)

// Тема

let  theme = 'green';

function saveSettingsToLS() {
  localStorage.setItem('settingsLS', JSON.stringify(theme));
}

function recoverySettings() {
  if (localStorage.getItem('settingsLS')) {
    let settingsTheme = JSON.parse(localStorage.getItem('settingsLS'));
    theme = settingsTheme;
    if (settingsTheme == 'blue') {
      recoveryTheme();
    }
  }
}

window.addEventListener('load', recoverySettings);

const themeIcon = document.querySelector('.theme');
const root = document.querySelector('.root');
const logoTitle = document.querySelector('.logo__title');
const arrow = document.querySelectorAll('.arrow');
const navItems = document.querySelectorAll('.nav__item');

function recoveryTheme() {
  themeIcon.classList.toggle('blue-theme');
  root.classList.toggle('blue-theme-bg');
  logoTitle.classList.toggle('blue-theme');
  nextLevelBtn.classList.toggle('blue-theme');
  newGameBtn.classList.toggle('blue-theme');
  scoreNum.classList.toggle('blue-theme');
  arrow.forEach((i) => { i.classList.toggle('blue-theme') });
  navItems.forEach((i) => { i.classList.toggle('blue-theme') });
}

function changeTheme() {
  recoveryTheme();
  theme == 'green'
    ? (theme = 'blue')
    : (theme = 'green');

  saveSettingsToLS();
}

themeIcon.addEventListener('click', changeTheme);

export { isTrueAnswer, currBird, logo, firstNav, gameNav, galleryNav, nextLevelBtn }

console.group('Scope: 270/270');
  console.log('Вместо смены языка - смена темы, в описании к заданию разрешено');
  console.log('Вёрстка, дизайн, UI всех трёх страниц приложения +60');
  console.log('Аудиоплеер +30');
  console.log('Верхняя панель страницы викторины +20');
  console.log('Блок с вопросом +20');
  console.log('Блок с вариантами ответов (названия птиц) +60');
  console.log('Блок с описанием птицы: +30');
  console.log('Кнопка перехода к следующему вопросу +30');
  console.log('Extra scope +20');
  console.groupEnd();