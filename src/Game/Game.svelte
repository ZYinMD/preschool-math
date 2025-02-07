<script lang="ts">
  import QuestionBar from "../lib/QuestionBar/QuestionBar.svelte";
  import { states } from "../states/states.svelte";
  const currentQuestion = states.currentQuestion;
</script>

<!-- @component the game view -->
<div class="component">
  {#if currentQuestion}
    <QuestionBar a={currentQuestion[0]} b={currentQuestion[1]} />
  {:else}
    <div>No question??</div>
  {/if}

  <button on:click={() => (states.view = "settings")}>New</button>
</div>

<style>
</style>
