<script lang="ts">
  import { states } from "../states/states.svelte";
</script>

<!-- @component the game view -->
<div class="component">
  Game here...
  <button on:click={() => (states.view = "settings")}>New</button>
</div>

<style>
  .component {
    background-color: Pink;
  }
</style>
