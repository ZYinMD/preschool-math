<script lang="ts">
  import { scale } from "svelte/transition";
  import { d, s } from "../../../states/states.svelte";
  const text = $derived.by(() => {
    if (s.remindToDrag === true) return "Drag correct number to replace pink";
    if (
      s.nowAt === 0 &&
      d.currentQuestion.a === 3 &&
      d.currentQuestion.b === 2
    ) {
      return `Tutorial: we have 3 blue + 2 orange = 5 in total. Drag 3, 2, 5 into the equation`;
    }
    if (
      s.nowAt === 1 &&
      d.currentQuestion.a === 8 &&
      d.currentQuestion.b === 4
    ) {
      if (s.currentAnswer.c !== 12) {
        return `The "<span class="pipe">|</span>" means 10, so the sum is 12. Drag 12 to the right side.`;
      } else if (s.currentAnswer.b !== 4) {
        return "It's easy to see the 2nd number is 4, drag 4 into the 2nd box";
      } else {
        return "You figure out the rest!";
      }
    }
    if (
      s.nowAt === 2 &&
      d.currentQuestion.a === 4 &&
      d.currentQuestion.b === 3
    ) {
      return "You can also just click, try clicking 4, 3, 7";
    }
  });
</script>

<!-- @component the text of tutorial -->
{#key text}
  <div class="component">
    <div in:scale>{@html text}</div>
  </div>
{/key}

<style>
  .component {
    color: coral;
    opacity: 0.8;
    font-size: clamp(12px, min(3.2svh, 1.5svw), 18px);
  }
  /* see https://svelte.dev/docs/svelte/@html for why :global is needed */
  .component :global {
    span.pipe {
      display: inline-block;
      color: grey;
      font-family: Courier, sans-serif;
      font-weight: 100;
      transform: scaleY(2);
    }
  }
</style>
