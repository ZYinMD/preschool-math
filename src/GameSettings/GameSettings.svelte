<script lang="ts">
  import { d, s } from "../states/states.svelte";
  let { allowQuestionStartingWith } = s.settings;

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
</script>

<!-- @component the settings view -->
<div class="component">
  <div>Number of questions:</div>
  <input type="range" min="5" max="30" bind:value={s.settings.numQuestions} />
  <span>{s.settings.numQuestions}</span>
  <div>Include questions starting with:</div>
  <div class="checkboxes">
    <label>
      <input type="checkbox" bind:checked={allowQuestionStartingWith.two} />
      2
    </label>

    <label>
      <input type="checkbox" bind:checked={allowQuestionStartingWith.three} />
      3
    </label>

    <label>
      <input type="checkbox" bind:checked={allowQuestionStartingWith.four} />
      4
    </label>

    <label>
      <input type="checkbox" bind:checked={allowQuestionStartingWith.five} />
      5
    </label>

    <label>
      <input type="checkbox" bind:checked={allowQuestionStartingWith.six} />
      6
    </label>

    <label>
      <input type="checkbox" bind:checked={allowQuestionStartingWith.seven} />
      7
    </label>

    <label>
      <input type="checkbox" bind:checked={allowQuestionStartingWith.eight} />
      8
    </label>

    <label>
      <input type="checkbox" bind:checked={allowQuestionStartingWith.nine} />
      9
    </label>
  </div>
  <div>
    <button
      onclick={() => {
        s.view = "game";
        // on click start, randomly pick x questions from derived.allowedQuestions, where x is states.settings.numQuestions, and put them in states.questionsThisGame
        s.questionsThisGame = shuffle(d.questionPool).slice(
          0,
          s.settings.numQuestions
        );
        s.nowAt = 0;
      }}>Start</button
    >
  </div>
</div>

<style>
  .checkboxes {
    display: flex;
    gap: 15px;
  }
</style>
