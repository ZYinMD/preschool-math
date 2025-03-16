<script lang="ts">
  import { scale } from "svelte/transition";
  import { d, s } from "../../../states/states.svelte";
  const text = $derived.by(() => {
    if (!s.settings.showTutorial) return null;
    if (d.gameStage !== "playing") return null;
    if (
      s.nowAt === 0 &&
      d.currentQuestion.a === 3 &&
      d.currentQuestion.b === 2
    ) {
      return `Tutorial: we have 3 green + 2 orange = 5 in total, so please click 3, 2, and 5.`;
    }
    if (
      s.nowAt === 1 &&
      d.currentQuestion.a === 8 &&
      d.currentQuestion.b === 4
    ) {
      if (s.currentAnswer.b !== 4) {
        return "Tutorial: it's easy to see the 2nd number is 4, so drag 4 into the 2nd box";
      } else if (s.currentAnswer.c !== 12) {
        return `The "<span class="pipe">|</span>" means 10, so the sum must be 12. Drag 12 to the right side.`;
      } else {
        return "You figure out the 1st number!";
      }
    }
    return null;
  });
</script>

<!-- @component the text of tutorial -->
{#if text}
  {#key text}
    <div class="component">
      <div in:scale>{@html text}</div>
    </div>
  {/key}
{/if}

<style>
  .component {
    color: coral;
    opacity: 0.8;
    font-size: clamp(12px, min(4.6svh, 2svw), 19px);
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
