<script lang="ts">
  import type { TransitionConfig } from "svelte/transition";
  import Cloze from "./Cloze.svelte";
  import { sineInOut } from "svelte/easing";
  import { s } from "../../states/states.svelte";
  function rotateIn(_node: Node): TransitionConfig {
    return {
      delay: 300,
      duration: 50,
      css: (t, _u) => `
        opacity: ${t};
        transform: rotateX(${0.75 + t / 4}turn);
      `,
    };
  }
  function flyAway(_node: Node): TransitionConfig {
    return {
      duration: 200,
      delay: 0,
      easing: sineInOut,
      css: (t, u) =>
        `transform: translateX(${-40 * u}vw) translateY(${-30 * u}vw) rotateZ(${
          -140 * u
        }deg) scale(${t}); opacity: ${t};`,
    };
  }
</script>

<!-- @component the a + b = c for player to fill -->
<div class="placeholder">
  {#key s.nowAt}
    <div class="component" id="answer-bar" in:rotateIn out:flyAway>
      <Cloze position="a" />
      <span class="operator">+</span>
      <Cloze position="b" />
      <span class="operator">=</span>
      <Cloze position="c" />
    </div>
  {/key}
</div>

<style>
  .placeholder {
    pointer-events: none;
    display: grid;
    grid-template-areas: "only";
    place-items: center;
    margin-bottom: clamp(5px, 4vh, 50px);
    height: var(--number-square-size);
  }
  .component {
    grid-area: only;
    display: flex;
    align-items: center;
    gap: var(--number-square-font-size);
    transition: translate 30ms ease-in-out; /* this is for the "jump" animation when the answer is correct, it's invoked with javascript in dnd.ts' */
  }
  .operator {
    user-select: none;
    font-size: calc(var(--number-square-font-size) * 1.4);
    font-family: Courier, monospace;
  }
</style>
