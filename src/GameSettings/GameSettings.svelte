<script lang="ts">
  import { d, restartGame, s } from "../states/states.svelte";
  let { allowQuestionStartingWith } = s.settings;
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
        restartGame();
        s.view = "game";
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
