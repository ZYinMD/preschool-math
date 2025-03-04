import { d, s } from "./states.svelte";

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
  }
  s.allDone = false;
  s.nowAt = 0;
}
