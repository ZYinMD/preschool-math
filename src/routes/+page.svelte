<script lang="ts">
  import GameBoard from "../lib/GameBoard/GameBoard.svelte";
  import GameSettings from "../lib/GameSettings/GameSettings.svelte";
  import Practice from "../lib/Practice/Practice.svelte";
  import { s } from "../states/states.svelte";
</script>

<div class="component">
  {#if s.view === "game"}
    <GameBoard />
  {:else if s.view === "settings"}
    <GameSettings />
  {:else if s.view === "practice"}
    <Practice />
  {/if}
</div>

<style>
</style>
