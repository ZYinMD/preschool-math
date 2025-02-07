<script lang="ts">
  import { states } from "../../states/states.svelte";
  import Tiles1to10 from "./Tiles1to10.svelte";
  import Tiles1to20 from "./Tiles1to20.svelte";
  const currentQuestion = states.currentQuestion;
  const total = currentQuestion ? currentQuestion[0] + currentQuestion[1] : 0;
</script>

<!-- @component the row of tiles -->
<div class="container">
  {#if currentQuestion}
    {#if total <= 10}
      <Tiles1to10 a={currentQuestion[0]} b={currentQuestion[1]} />
    {:else}
      <Tiles1to20 a={currentQuestion[0]} b={currentQuestion[1]} />
    {/if}
  {:else}
    <div>No question??</div>
  {/if}
</div>

<style>
</style>
