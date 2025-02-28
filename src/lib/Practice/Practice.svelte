<script lang="ts">
  import { allQuestionFlat, s } from "../../states/states.svelte";
  import TilesBar from "../components/TilesBar/TilesBar.svelte";
  import ArrowIcon from "../Icons/ArrowIcon.svelte";
  import ChevronIcon from "../Icons/ChevronIcon.svelte";
  let position = $state(28);
  const currentQuestion = $derived(allQuestionFlat[position]);
</script>

<!-- @component the practice mode -->
<div class="component">
  <div class="header">
    <button class="back-button" onclick={() => (s.view = "game")}>
      <ChevronIcon />
    </button>
  </div>
  <div class="tiles-bar">
    <TilesBar a={currentQuestion[0]} b={currentQuestion[1]} animate={false} />
  </div>
  <div class="hint">{currentQuestion[0]} + ? = ?</div>
  <div class="arrows">
    <button
      class="arrow-left"
      onclick={() => {
        if (position > 0) position--;
        else position = allQuestionFlat.length - 1;
      }}><ArrowIcon /></button
    >
    <button
      class="arrow-right"
      onclick={() => {
        if (position < allQuestionFlat.length - 1) position++;
        else position = 0;
      }}><ArrowIcon /></button
    >
  </div>
</div>

<style>
  .component {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100svw;
    height: 100svh;
    overflow: hidden;
  }
  .arrows {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 80px;
  }
  .arrow-left,
  .arrow-right {
    padding: 2px;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: grid;
    place-items: center;
    scale: 1.5;
    font-size: 1.8em;
    opacity: 0.5;
    &:hover {
      background-color: #eee;
    }
    &:active {
      background-color: #ddd;
    }
  }
  .arrow-right {
    transform: scaleX(-1);
  }
</style>
