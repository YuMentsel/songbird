function random() {
  return Math.floor(Math.random() * 6);
}

function toDisableAll(arr) {
  arr.forEach(el => el.classList.add('disabled'));
}

export { random, toDisableAll }