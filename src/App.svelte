<script lang="ts">
  import Game from "./Game/Game.svelte";
  import Settings from "./Settings/Settings.svelte";
  import { s } from "./states/states.svelte";
</script>

<div class="component">
  {#if s.view === "game"}
    <Game />
  {:else}
    <Settings />
  {/if}
</div>

<style>
</style>
