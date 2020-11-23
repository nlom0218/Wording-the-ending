const $startGame = document.querySelector("#js-startGame");
const $firstWord = document.querySelector("#js-inputFirstWord");
const $curWord = document.querySelector("#js-curWord");
const $playGame = document.querySelector("#js-playGame");
const $inputWord = document.querySelector("#js-inputWord");
const $2ndWord = document.querySelector("#js-2ndWord");
const $3rdWord = document.querySelector("#js-3rdWord");
const $4thWord = document.querySelector("#js-4thWord");
const $5thWord = document.querySelector("#js-5thWord");
const $resetBtn = document.querySelector("#js-resetBtn");
const $wordContainer = document.querySelector(".wordContainer");

let wordHistory = [];

saveGame = () => {
  localStorage.setItem("wordGame", JSON.stringify(wordHistory));
};

preWord = () => {
  if (wordHistory[wordHistory.length - 2] === undefined) {
    $2ndWord.innerText = "";
  } else {
    $2ndWord.innerText = wordHistory[wordHistory.length - 2];
  }
  if (wordHistory[wordHistory.length - 3] === undefined) {
    $3rdWord.innerText = "";
  } else {
    $3rdWord.innerText = wordHistory[wordHistory.length - 3];
  }
  if (wordHistory[wordHistory.length - 4] === undefined) {
    $4thWord.innerText = "";
  } else {
    $4thWord.innerText = wordHistory[wordHistory.length - 4];
  }
  if (wordHistory[wordHistory.length - 5] === undefined) {
    $5thWord.innerText = "";
  } else {
    $5thWord.innerText = wordHistory[wordHistory.length - 5];
  }
};

curWord = () => {
  const curWord = wordHistory[wordHistory.length - 1];
  const curWordLastText = curWord[curWord.length - 1];
  return curWordLastText;
};

printWord = (word) => {
  $curWord.innerText = word;
  preWord();
  saveGame();
};

handleInputWord = (e) => {
  e.preventDefault();
  const word = $inputWord.value;
  $inputWord.value = "";
  if (curWord() !== word[0]) {
    alert("첫 글자를 확인 후 다시 입력하세요");
  } else if (wordHistory.includes(word)) {
    alert("중복된 낱말입니다. 다시 입력하세요");
  } else {
    wordHistory.push(word);
    printWord(word);
    console.log(wordHistory);
  }
};

handleMakeFirstWord = (e) => {
  e.preventDefault();
  $firstWord.classList.add("hiding");
  $wordContainer.classList.remove("hiding");
  $playGame.classList.remove("hiding");
  $resetBtn.classList.remove("hiding");
  const firstWord = $firstWord.value;
  $firstWord.value = "";
  wordHistory.push(firstWord);
  printWord(firstWord);
};

handleClickResetBtn = () => {
  $firstWord.classList.remove("hiding");
  $wordContainer.classList.add("hiding");
  $playGame.classList.add("hiding");
  $resetBtn.classList.add("hiding");
  wordHistory = [];
  saveGame();
  $curWord.innerText = "";
  $2ndWord.innerText = "";
  $3rdWord.innerText = "";
  $4thWord.innerText = "";
  $5thWord.innerText = "";
};

hasSaveGame = () => {
  const saveWord = JSON.parse(localStorage.getItem("wordGame"));
  wordHistory = saveWord;
  if (saveWord[0] === undefined) {
    $curWord.innerText = "";
  } else {
    $firstWord.classList.add("hiding");
    $wordContainer.classList.remove("hiding");
    $playGame.classList.remove("hiding");
    $resetBtn.classList.remove("hiding");
    printWord(saveWord[saveWord.length - 1]);
  }
};

function init() {
  saveGame();
  $startGame.addEventListener("submit", handleMakeFirstWord);
  $playGame.addEventListener("submit", handleInputWord);
  $resetBtn.addEventListener("click", handleClickResetBtn);
  hasSaveGame();
}

init();
