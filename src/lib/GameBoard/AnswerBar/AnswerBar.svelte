<script lang="ts">
  import { sineInOut } from "svelte/easing";
  import type { TransitionConfig } from "svelte/transition";
  import { s } from "../../../states/states.svelte";
  import Cloze from "./Cloze.svelte";
  function rotateIn(_node: Node): TransitionConfig {
    return {
      delay: 300,
      duration: 120,
      css: (t, _u) => `
        opacity: ${t};
        transform: rotateX(${0.75 + t / 4}turn);
      `,
    };
  }
  function flyAway(_node: Node): TransitionConfig {
    return {
      duration: 300,
      delay: 0,
      easing: sineInOut,
      css: (t, u) =>
        `transform: translateX(${-40 * u}svw) translateY(${-30 * u}svw) rotateZ(${
          -140 * u
        }deg) scale(${t}); opacity: ${t};`,
    };
  }
</script>

<!-- @component the a + b = c for player to fill -->
<div class="placeholder">
  {#key s.nowAt}
    <div
      class="answer-bar"
      id="answer-bar"
      class:hidden={s.allDone}
      in:rotateIn
      out:flyAway
    >
      <Cloze position="a" />
      <span class="operator">+</span>
      <Cloze position="b" />
      <span class="operator">=</span>
      <Cloze position="c" />
    </div>
  {/key}
  {#if s.allDone}
    <div class="all-done-message">All done!</div>
  {/if}
</div>

<style>
  .placeholder {
    display: grid;
    grid-template-areas: "only";
    place-items: center;
    margin-bottom: clamp(5px, 3svh, 50px);
    height: var(--number-square-size);
  }
  .answer-bar {
    grid-area: only;
    display: flex;
    align-items: center;
    gap: var(--number-square-font-size);
    transition: translate 30ms ease-in-out; /* this is for the "jump" animation when the answer is correct, it's invoked with javascript in dnd.ts' */
  }
  .answer-bar.hidden {
    visibility: hidden; /* use visibility hidden here because I don't want the layout to shift */
  }
  .operator {
    user-select: none;
    font-size: calc(var(--number-square-font-size) * 1.4);
    font-family: Courier, monospace;
  }
  .all-done-message {
    font-size: 18px;
    grid-area: only;
  }
</style>
