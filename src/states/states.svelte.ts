import { browser } from "$app/environment";

type Question = [number, number];

const allQuestions = {
  two: [
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
    [2, 7],
    [2, 8],
  ] as Question[],
  three: [
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
  ] as Question[],
  four: [
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 5],
    [4, 6],
  ] as Question[],
  five: [
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
    [5, 5],
    [5, 6],
  ] as Question[],
  six: [
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],
    [6, 6],
    [6, 7],
    [6, 8],
  ] as Question[],
  seven: [
    [7, 1],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
    [7, 6],
    [7, 7],
    [7, 8],
  ] as Question[],
  eight: [
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
    [8, 5],
    [8, 6],
    [8, 7],
  ] as Question[],
  nine: [
    [9, 1],
    [9, 2],
    [9, 3],
    [9, 4],
    [9, 5],
    [9, 6],
    [9, 7],
    [9, 8],
    [9, 9],
  ] as Question[],
};
export const allQuestionFlat = Object.values(allQuestions).flat();

export const defaultSettings = {
  schemaVersion: 1, // if the shape of this object gets changed in the future, increment this number
  allowQuestionStartingWith: {
    two: false,
    three: false,
    four: true,
    five: true,
    six: true,
    seven: true,
    eight: true,
    nine: true,
  },
  numQuestions: 10,
  maxSum: 20,
  showTutorial: true,
};

const persistedUserSettings = browser
  ? JSON.parse(
      localStorage.getItem(`settings_v${defaultSettings.schemaVersion}`)! // if non existing, will return null.JSON.parse(null) is also null
    )
  : null;
console.debug("Settings used last time:", persistedUserSettings);

/**
 * s = "global states"
 */
export const s = $state({
  view: "game" as "game" | "settings" | "practice",
  questionsThisGame: [[0, 0]],
  nowAt: 0, // the current index in questionsThisGame
  flashPlus1: false, // when true, show "+1" by "progress"
  currentAnswer: { a: 0, b: 0, c: 0 }, // the user input value of a b c. Starts with 0 as being empty

  settings: (persistedUserSettings ||
    defaultSettings) as typeof defaultSettings,
});

export function persistSettings() {
  localStorage.setItem(
    `settings_v${s.settings.schemaVersion}`,
    JSON.stringify(s.settings)
  );
}

const currentQuestion = $derived.by(() => {
  const currentQuestion = s.questionsThisGame[s.nowAt];
  if (currentQuestion) {
    const [a, b] = currentQuestion;
    const c = a + b;
    return { a, b, c };
  } else return { a: 0, b: 0, c: 0 };
});

/**
 * The pool of questions that are allowed to be asked
 */
const questionPool = $derived.by(() => {
  let result: Question[] = [];
  Object.entries(s.settings.allowQuestionStartingWith)
    .filter(([_key, allowed]) => allowed)
    .forEach(([key, _allowed]) => {
      result.push(...allQuestions[key as keyof typeof allQuestions]);
    });
  result = result.filter(([a, b]) => a + b <= s.settings.maxSum);
  return result;
});

const gameStage = $derived.by(() => {
  if (questionPool.length === 0) return "no_questions"; // happens when user restricts settings too much that no question is eligible
  if (JSON.stringify(s.questionsThisGame) === "[[0,0]]") return "not_started"; // a fleeting moment after the games loads, but before restartGame() is called, in this moment the questions of this game hasn't been put together (it's the job of restartGame()). The $effect of the game board is responsible to call restartGame() in this stage, which will put together the the questions of the game and show the animation of question1.
  if (s.nowAt < s.questionsThisGame.length) return "playing";
  return "all_done";
});

/**
 * d = "global derived states"
 */
export const d = {
  get questionPool() {
    return questionPool;
  },
  get currentQuestion() {
    return currentQuestion;
  },
  get gameStage() {
    return gameStage;
  },
};

// @ts-expect-error: cheat code
window.dev = {
  finishTutorial() {
    s.settings.showTutorial = false;
    persistSettings();
  },
};
