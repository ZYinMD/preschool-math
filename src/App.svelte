<script lang="ts">
  import { states } from "./states/states.svelte";
  import Game from "./Game/Game.svelte";
  import Settings from "./Settings/Settings.svelte";
</script>

<div class="component">
  {#if states.view === "game"}
    <Game />
  {:else}
    <Settings />
  {/if}
</div>

<style>
</style>
