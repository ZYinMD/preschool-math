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
<div class="rotate-alert">Please rotate your phone to landscape mode</div>

<style>
  .rotate-alert {
    color: tomato;
    position: fixed;
    top: 0;
    left: 0;
    padding-bottom: 14%;
    width: 100%;
    height: 100%;
    /* padding-bottom: 80%; */
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
    z-index: 1;
    text-align: center;
  }
  @media (width > 500px) {
    .rotate-alert {
      display: none;
    }
  }
</style>
