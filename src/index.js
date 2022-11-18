import './index.html';
import './index.scss';

import birdsData from "./modules/birdsDataRu";
import birdsDataEn from "./modules/birdsDataEn";

import { random, toDisableAll } from './modules/helpers';
import { loadTrack, pauseTrack } from './modules/audioPlayer1';
import './modules/audioPlayer2';
import { getBirdsNames, removeBirdsNames } from './modules/createAnswersList';
import { insertBirdInfo } from'./modules/insertBirdInfo';
import { audioYes, audioNo } from'./modules/setSoud';

const levelNav = document.querySelectorAll('.nav__item');
const scoreNum = document.querySelector('.score__num');

const main = document.querySelector('.main');
const wonPage = document.querySelector('.won-page');

const answersList = document.querySelector('.answers__list');
const nextLevelBtn = document.querySelector('#next-level');
const newGameBtn = document.querySelector('#new-game');

let levelIndex = 0;
let birdIndex = random();
let currBird = updateCurrBird();
let isTrueAnswer = false;
let score = 0;

function updateCurrBird() {
  return birdsData[levelIndex][birdIndex];
}

// Загрузка аудио в основной плейер

loadTrack(currBird);

// Создание списка ответов

let birdNames = getBirdsNames(levelIndex, birdsData, answersList);

// Выбор ответа

let errors = 0;

answersList.addEventListener('click', (e) => {
  const answer = e.target;
  const answersArr = document.querySelectorAll('.answers__answer');
  if (answer.closest('.answers__answer')) {
    if (answer.textContent === currBird.name) {
      audioYes.play();
      answer.style.color = '#588620';
      answer.classList.add('green');
      isTrueAnswer = true;
      insertBirdInfo(isTrueAnswer, currBird);
      pauseTrack();
      getScore(errors);
      nextLevelBtn.classList.remove('disabled');
      toDisableAll(answersArr);
    } else {
      audioNo.play();
      answer.style.color = '#e00038';
      answer.classList.add('red');
      errors += 1;
    }
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
  nextLevelBtn.classList.add('disabled');
}

function createNewLevel() {
  birdIndex = random();
  currBird = updateCurrBird();
  isTrueAnswer = false;
  errors = 0;
  removeBirdsNames();
  birdNames = getBirdsNames(levelIndex, birdsData, answersList);
  console.log(currBird.name);
  insertBirdInfo(isTrueAnswer, currBird);
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
  console.log('errors ' + errors);
  score += 5 - errors;
  setScore();
}

function setScore() {
  scoreNum.textContent = score;
}

// Страница с поздравлением

function showWonPage() {
  main.classList.add('none');
  wonPage.classList.remove('none');
  const wonMessage= document.querySelector('.won-page__message');
  wonMessage.innerHTML = `
  <span>Поздравляем!</span><br>
  Вы прошли викторину и набрали ${score} из 30 возможных баллов.`;
}

function newGame() {
  main.classList.remove('none');
  wonPage.classList.add('none');
  levelIndex = 0;
  score = 0;
  setScore();
  createNewLevel()
}

newGameBtn.addEventListener('click', newGame)

export { isTrueAnswer, currBird }