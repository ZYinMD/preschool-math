<script lang="ts">
  import { states } from "../states/states.svelte";
</script>

<!-- @component the settings view -->
<div class="component">
  Settings here...
  <button on:click={() => (states.view = "game")}>Start</button>
</div>

<style>
  .component {
    background-color: Pink;
  }
</style>
