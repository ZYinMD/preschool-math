<script lang="ts">
  import QuestionBar from "../lib/QuestionBar/QuestionBar.svelte";
  import { states } from "../states/states.svelte";
</script>

<!-- @component the game view -->
<div class="component">
  <QuestionBar />
  <button on:click={() => (states.view = "settings")}>New</button>
</div>

<style>
</style>
