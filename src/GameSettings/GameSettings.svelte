<script lang="ts">
  import { s } from "../states/states.svelte";
  let { allowQuestionStartingWith } = s.settings;
</script>

<!-- @component the settings view -->
<div class="component">
  <section>
    <label for="num-questions">Number of questions:</label>
    <input
      id="num-questions"
      type="range"
      min="5"
      max="30"
      bind:value={s.settings.numQuestions}
    />
    <span>{s.settings.numQuestions}</span>
  </section>
  <section>
    <div>The 1st number can be:</div>
    <div class="checkboxes">
      <div>
        <label for="two">2</label>
        <input
          id="two"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.two}
        />
      </div>
      <div>
        <label for="three">3</label>
        <input
          id="three"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.three}
        />
      </div>
      <div>
        <label for="four">4</label>
        <input
          id="four"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.four}
        />
      </div>
      <div>
        <label for="five">5</label>
        <input
          id="five"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.five}
        />
      </div>
      <div>
        <label for="six">6</label>
        <input
          id="six"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.six}
        />
      </div>
      <div>
        <label for="seven">7</label>
        <input
          id="seven"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.seven}
        />
      </div>
      <div>
        <label for="eight">8</label>
        <input
          id="eight"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.eight}
        />
      </div>
      <div>
        <label for="nine">9</label>
        <input
          id="nine"
          type="checkbox"
          bind:checked={allowQuestionStartingWith.nine}
        />
      </div>
    </div>
  </section>
  <section>
    <label for="max-sum">Maximum sum (3rd number) can be:</label>
    <input
      id="max-sum"
      type="range"
      min="5"
      max="20"
      bind:value={s.settings.maxSum}
    />
    <span>{s.settings.maxSum}</span>
  </section>
  <section>
    <button
      onclick={() => {
        s.view = "game";
        localStorage.setItem(
          `settings_v${s.settings.schemaVersion}`,
          JSON.stringify(s.settings)
        );
      }}>Go</button
    >
  </section>
</div>

<style>
  .component {
    width: 100svw;
    padding: clamp(5px, 6svh, 40px) clamp(5px, 8svw, 50px);
    display: flex;
    font-size: clamp(15px, 2.5svw, 18px);
    font-family: Arial, sans-serif;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  section {
    margin: 10px 0;
  }
  .checkboxes {
    display: flex;
    gap: clamp(5px, 2svw, 25px);
    align-items: center;
    flex-wrap: wrap;
  }

  .checkboxes > div {
    display: flex;
  }
  button {
    font-size: 18px;
    padding-left: 10px;
    padding-right: 10px;
    opacity: 0.7;
  }
</style>
