<script lang="ts">
  import { d, s } from "../../../states/states.svelte";
</script>

<!-- @component the text of tutorial -->
<div class="component">
  {#if s.settings.showTutorial === true}
    {#if s.nowAt === 0 && d.currentQuestion.a === 3 && d.currentQuestion.b === 2}
      <div>
        Tutorial: the answer is 3 + 2 = 5, drag 3, 2, 5 into the equation
      </div>
    {:else if s.nowAt === 1 && d.currentQuestion.a === 8 && d.currentQuestion.b === 4 && s.currentAnswer.c !== 12}
      <div>
        Tutorial 2: it's easy to see the sum is 12, because the "<span
          class="pipe">|</span
        >" means 10. Drag 12 to the right side.
      </div>
    {:else if s.nowAt === 2 && d.currentQuestion.a === 8 && d.currentQuestion.b === 4 && s.currentAnswer.c === 12}
      <div>I'll let you figure out the rest!</div>
    {/if}
  {/if}
</div>

<style>
  .component {
    color: coral;
    opacity: 0.8;
    font-size: clamp(12px, min(3.3svh, 1.6svw), 18px);
  }
  .pipe {
    display: inline-block;
    color: grey;
    font-family: Courier, sans-serif;
    font-weight: 100;
    transform: scaleY(2);
  }
</style>
