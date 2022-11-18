export function getBirdsNames(levelIndex, birdsData, answersList) {
  let birdNames = [];
  for (let i = 0; i < 6; i++) {
    const answer = document.createElement('li');
    answer.classList.add('answers__answer');
    const birdName = birdsData[levelIndex][i].name;
    answer.textContent = birdName;
    answersList.append(answer);
    birdNames.push(birdName);
  };
  return birdNames;
}

export function removeBirdsNames() {
  const answersArr = document.querySelectorAll('.answers__answer');
  answersArr.forEach((answer) => {
    answer.remove();
  })
}





