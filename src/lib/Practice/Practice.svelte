<script lang="ts">
  import { blur, scale } from "svelte/transition";
  import { allQuestionFlat, s } from "../../states/states.svelte";
  import TilesBar from "../components/TilesBar/TilesBar.svelte";
  import ArrowIcon from "../Icons/ArrowIcon.svelte";
  import ChevronIcon from "../Icons/ChevronIcon.svelte";
  let position = $state(28);
  let [a, b] = $derived(allQuestionFlat[position]);
</script>

<!-- @component the practice mode -->
<div class="component">
  <div class="header">
    <button class="back-button" onclick={() => (s.view = "game")}>
      <ChevronIcon />
    </button>
  </div>
  <div class="tiles-bar">
    <TilesBar {a} {b} animate={false} />
  </div>

  <div class="hint">
    {#key a}
      <span in:blur={{ duration: 400 }}>{a}</span>
    {/key}
    +
    {#key b}
      <span in:scale={{ duration: 100 }}>?</span>
    {/key}
    =
    {#key b}
      <span in:scale={{ duration: 100 }}>?</span>
    {/key}
  </div>
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
  <div class="instruction">Answer aloud: what are the missing numbers?</div>
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
  .header {
    width: var(--tiles-bar-width);
    display: flex;
    justify-content: flex-start;
    margin-bottom: clamp(0px, 7svh, 70px);
    & .back-button {
      position: relative;
      left: -0.35em;
    }
  }
  .tiles-bar {
    margin-bottom: clamp(0px, 1.5svh, 15px);
  }
  .hint {
    font-size: 1.5em;
    font-size: calc(var(--tiles-bar-width) / 17);
    margin-bottom: clamp(0px, 7svh, 70px);
    display: flex;
    gap: 1em;
  }
  .arrows {
    display: flex;
    gap: clamp(40px, 8svw, 80px);
    margin-bottom: clamp(0px, 6svh, 60px);
  }
  .arrow-left,
  .arrow-right {
    padding: 2px;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: grid;
    place-items: center;
    scale: 1.5; /* don't change this, because somehow it messes up the centering of the icon */
    font-size: clamp(20px, 3.2svw, 32px);
    color: #bbb;
    &:active {
      background-color: #f8f8f8;
      scale: 1.55;
    }
  }
  /* apply hover styles only on devices that support hover. Without this, the hover state can stick after click */
  @media (hover: hover) {
    .arrow-left:hover,
    .arrow-right:hover {
      background-color: #f8f8f8;
    }
  }
  .arrow-right {
    transform: scaleX(-1);
  }
  .instruction {
    font-size: 14px;
    opacity: 0.5;
    margin-top: 5px;
  }
</style>
