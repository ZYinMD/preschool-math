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
  ] as Question[],
};

/**
 * s = "states"
 */
export const s = $state({
  view: "game" as "game" | "settings",
  questionsThisGame: [] as Question[],
  nowAt: -1, // the current index in questionsThisGame
  currentAnswer: {
    values: { a: 0, b: 0, c: 0 }, // the user inputted value of a b c. Starts with 0 as being empty
    hasTriedTimes: 0,
    showColor: false, // when true (briefly), show green background on the answer cloze if answered right, red if wrong. When false (most of the time), will show grey background, and transparent when empty
  },
  kayPadDisabled: false, // all buttons are disabled for 1 second after question submission, animation happens in this second
  settings: {
    allowQuestionStartingWith: {
      two: true,
      three: true,
      four: true,
      five: true,
      six: true,
      seven: true,
      eight: true,
      nine: true,
    },
    numQuestions: 10,
  },
});

const currentQuestion = $derived.by(() => {
  if (s.nowAt === -1) {
    return { a: 0, b: 0, c: 0 };
  }
  const [a, b] = s.questionsThisGame[s.nowAt];
  const c = a + b;
  return { a, b, c };
});

/**
 * The pool of questions that are allowed to be asked
 */
const questionPool = $derived.by(() => {
  const result: Question[] = [];
  Object.entries(s.settings.allowQuestionStartingWith)
    .filter(([_key, allowed]) => allowed)
    .forEach(([key, _allowed]) => {
      result.push(...allQuestions[key as keyof typeof allQuestions]);
    });
  return result;
});

/**
 * d = "derived states"
 */
export const d = {
  get questionPool() {
    return questionPool;
  },
  get currentQuestion() {
    return currentQuestion;
  },
};
