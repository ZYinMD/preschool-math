<script lang="ts">
  import GameBoard from "../lib/GameBoard/GameBoard.svelte";
  import GameSettings from "../lib/GameSettings/GameSettings.svelte";
  import { s } from "../states/states.svelte";
</script>

<div class="component">
  {#if s.view === "game"}
    <GameBoard />
  {:else}
    <GameSettings />
  {/if}
</div>

<style>
</style>
