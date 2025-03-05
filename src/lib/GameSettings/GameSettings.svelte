<script lang="ts">
  import { fly } from "svelte/transition";
  import { restartGame } from "../../states/helper";
  import { persistSettings, s } from "../../states/states.svelte";
  import ChevronIcon from "../Icons/ChevronIcon.svelte";
  import ResetTutorial from "./ResetTutorialButton.svelte";
  const { allowQuestionStartingWith } = s.settings;
  let explainAboutChanges = $state(false);
  function anyChange() {
    // if currently in the middle of a game, show the red text "Changes take effect next game." If currently at the 1st question, do nothing, but when leaving the settings page, restart the game
    if (s.nowAt !== 0) explainAboutChanges = true;
  }
</script>

<!-- @component the settings view -->
<div class="component">
  <section class="top-row">
    <button
      class="back-button"
      onclick={() => {
        // if currently at the 1st question, when leaving the settings page, restart the game. It's possible that no settings have changed, but we don't care.
        if (s.nowAt === 0) {
          setTimeout(() => restartGame(), 0);
        }
        s.view = "game";
        persistSettings(); // persist settings
      }}
    >
      <ChevronIcon />
    </button>
    {#if explainAboutChanges}
      <div in:fly={{ duration: 100, y: 200 }} class="explain-changes">
        Changes take effect next game
      </div>
    {/if}
  </section>
  <section>
    <label for="num-questions">Number of questions:</label>
    <br />
    <input
      id="num-questions"
      type="range"
      min="5"
      max="30"
      bind:value={s.settings.numQuestions}
      onchange={anyChange}
    />
    <span>{s.settings.numQuestions}</span>
  </section>
  <section>
    <div>The 1st number can be:</div>
    <div class="row-of-checkboxes">
      <div>
        <label for="two">2</label>
        <input
          id="two"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.two}
          onchange={anyChange}
        />
      </div>
      <div>
        <label for="three">3</label>
        <input
          id="three"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.three}
          onchange={anyChange}
        />
      </div>
      <div>
        <label for="four">4</label>
        <input
          id="four"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.four}
          onchange={anyChange}
        />
      </div>
      <div>
        <label for="five">5</label>
        <input
          id="five"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.five}
          onchange={anyChange}
        />
      </div>
      <div>
        <label for="six">6</label>
        <input
          id="six"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.six}
          onchange={anyChange}
        />
      </div>
      <div>
        <label for="seven">7</label>
        <input
          id="seven"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.seven}
          onchange={anyChange}
        />
      </div>
      <div>
        <label for="eight">8</label>
        <input
          id="eight"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.eight}
          onchange={anyChange}
        />
      </div>
      <div>
        <label for="nine">9</label>
        <input
          id="nine"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.nine}
          onchange={anyChange}
        />
      </div>
    </div>
  </section>
  <section>
    <label for="max-sum">Maximum sum (3rd number) can be:</label>
    <br />
    <input
      id="max-sum"
      type="range"
      min="5"
      max="20"
      bind:value={s.settings.maxSum}
      onchange={anyChange}
    />
    <span>{s.settings.maxSum}</span>
  </section>
  <ResetTutorial />
</div>

<style>
  .component {
    width: 100svw;
    padding: clamp(5px, 5svh, 40px) clamp(5px, 8svw, 50px);
    display: flex;
    font-size: clamp(15px, 2.5svw, 18px);
    font-family: Arial, sans-serif;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  section {
    margin: min(10px, 1.3svh) 0;
  }
  .top-row {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .row-of-checkboxes {
    display: flex;
    gap: clamp(5px, 2svw, 22px);
    align-items: center;
    flex-wrap: wrap;
  }

  .row-of-checkboxes > div {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .explain-changes {
    color: Coral;
  }
  .back-button {
    border: none;
    padding: 5px;
    position: relative;
    left: -0.7em;
  }
</style>
