<script lang="ts">
  import { s } from "../states/states.svelte";
  let { allowQuestionStartingWith } = s.settings;
</script>

<!-- @component the settings view -->
<div class="component">
  <section>
    <div>Number of questions:</div>
    <input type="range" min="5" max="30" bind:value={s.settings.numQuestions} />
    <span>{s.settings.numQuestions}</span>
  </section>
  <section>
    <div>Include questions starting with:</div>
    <div class="checkboxes">
      <div>
        <label>2</label>
        <input type="checkbox" bind:checked={allowQuestionStartingWith.two} />
      </div>
      <div>
        <label>3</label>
        <input type="checkbox" bind:checked={allowQuestionStartingWith.three} />
      </div>
      <div>
        <label>4</label>
        <input type="checkbox" bind:checked={allowQuestionStartingWith.four} />
      </div>
      <div>
        <label>5</label>
        <input type="checkbox" bind:checked={allowQuestionStartingWith.five} />
      </div>
      <div>
        <label>6</label>
        <input type="checkbox" bind:checked={allowQuestionStartingWith.six} />
      </div>
      <div>
        <label>7</label>
        <input type="checkbox" bind:checked={allowQuestionStartingWith.seven} />
      </div>
      <div>
        <label>8</label>
        <input type="checkbox" bind:checked={allowQuestionStartingWith.eight} />
      </div>
      <div>
        <label>9</label>
        <input type="checkbox" bind:checked={allowQuestionStartingWith.nine} />
      </div>
    </div>
  </section>
  <section>
    <button
      onclick={() => {
        s.view = "game";
      }}>Go</button
    >
  </section>
</div>

<style>
  .component {
    width: 100svw;
    padding: clamp(5px, 6svh, 40px) clamp(5px, 8svw, 50px);
    display: flex;
    font-size: clamp(15px, 2.5svw, 19px);
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
  .checkboxes > input {
    margin: 0;
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
