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

export const states = $state({
  view: "settings" as "game" | "settings",
  includedQuestions: {
    two: true,
    three: true,
    four: true,
    five: true,
    six: true,
    seven: true,
    eight: true,
    nine: true,
  },
});

// export const includedQuestions = $derived.by(() => {
//   const result: Question[] = [];
//   Object.entries(inclusions).forEach(([key, value]) => {
//     if (value) result.push(...allQuestions[key as keyof typeof allQuestions]);
//   });
//   return result;
// });

// export const testDerived = $derived(1);
