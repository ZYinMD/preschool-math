<script lang="ts">
  import { scale } from "svelte/transition";
  import { s } from "../../../states/states.svelte";
  import Hamburger from "./Hamburger.svelte";
</script>

<!-- @component the top bar that shows things like "7 / 20", "New", etc -->
<div class="component">
  <div class="progress">
    Progress:
    {#key s.nowAt}
      <span class="flip">{s.nowAt + 1}</span> / {s.questionsThisGame.length}
    {/key}
    {#if s.flashPlus1}
      <span class="plus1" transition:scale>+1</span>
    {/if}
  </div>

  <Hamburger />
</div>

<style>
  .component {
    min-height: min-content;
    display: grid;
    grid:
      "progress message hamburger" auto
      /
      auto 1fr auto;
    align-items: end;
    width: 100%;
    padding-left: 5px;
  }
  .progress {
    grid-area: progress;
    font-size: clamp(14px, 2svw, 24px);
    display: flex;
    white-space: pre;
  }
  span.flip {
    display: inline-block;
    animation: flip 0.2s;
  }
  @keyframes flip {
    0% {
      transform: rotateX(0.5turn);
      opacity: 0;
    }
    100% {
      transform: none;
      opacity: 1;
    }
  }
  .plus1 {
    display: grid;
    place-items: center;
    height: 1.5em;
    width: 1.5em;
    color: white;
    background-color: lightgreen;
    border-radius: 50%;
  }
</style>
