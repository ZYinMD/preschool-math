import { browser } from "$app/environment";
import sound from "$lib/static/correct.mp3";
import { d, persistSettings, s } from "./states.svelte";

const correctSound = browser ? new Audio(sound) : null;

export function sleep(milliseconds: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(milliseconds); // return the milliseconds passed in, e.g. 2000. Usually it's not useful, but occasionally it can be used to determine who won a Promise.race()
    }, milliseconds);
  });
}
/**
 * Stackoverflow answer of how to shuffle an array.
 * This function first makes a copy of the array, then mutates the copy, then returns it.
 */
function shuffle(array: any[]) {
  const result = [...array];
  let currentIndex = result.length;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex],
      result[currentIndex],
    ];
  }
  return result;
}

export function restartGame() {
  s.currentAnswer = { a: 0, b: 0, c: 0 };
  // randomly pick x questions from derived.allowedQuestions, where x is states.settings.numQuestions, and put them in states.questionsThisGame
  s.questionsThisGame = shuffle(d.questionPool).slice(
    0,
    s.settings.numQuestions
  );
  if (s.settings.showTutorial) {
    s.questionsThisGame[0] = [3, 2];
    s.questionsThisGame[1] = [8, 4];
    s.questionsThisGame[2] = [4, 3];
  }
  s.allDone = false;
  s.nowAt = 0;
}

/**
 * Checks the if all 3 slots are currently filled with correct answers, if yes, react accordingly
 */
export async function checkAnswer() {
  const allCorrect =
    s.currentAnswer.a === d.currentQuestion.a &&
    s.currentAnswer.b === d.currentQuestion.b &&
    s.currentAnswer.c === d.currentQuestion.c;
  if (allCorrect) {
    // if this question completes the tutorial, stop showing tutorial in the future:
    if (s.settings.showTutorial && s.nowAt == 2) {
      s.settings.showTutorial = false;
      persistSettings();
    }
    // if the current answer has been correctly completed, animate the answer bar to make it jump, then move to the next question
    correctSound?.play();
    const answerBar = document.getElementById("answer-bar")!;
    answerBar.style.translate = "0 -7px";
    await sleep(25);
    answerBar.style.translate = "0 0";
    await sleep(650);
    s.currentAnswer = { a: 0, b: 0, c: 0 }; // reset the answer
    if (s.nowAt < s.questionsThisGame.length - 1) s.nowAt++;
    else s.allDone = true;

    // if currently not in tutorial, show "+1"
    if (!s.settings.showTutorial) {
      // await sleep(100);
      s.flashPlus1 = true;
      await sleep(1000);
      s.flashPlus1 = false;
    }
  }
}
