<script lang="ts">
  import { restartGame } from "../states/states.svelte";
  import AnswerBar from "./AnswerBar/AnswerBar.svelte";
  import Header from "./Header/Header.svelte";
  import KeyPad from "./KayPad/KeyPad.svelte";
  import TilesBar from "./TilesBar/TilesBar.svelte";
  $effect(() => {
    setTimeout(restartGame, 0); // restart the game after mount, so animation plays on page reload, and also on click "Go" in the GameSettings. Note it's actually not recommended to use $effect when you avoid it. Could lead to infinity loops, because the $effect rune automatically looks for any states that are used in it, and you can't specify which ones like in react. I've run into infinity loops and I had to use this async way to avoid it, because anything async is not tracked.
  });
</script>

<!-- @component the game view -->
<div class="component">
  <Header />
  <TilesBar />
  <AnswerBar />
  <KeyPad />
</div>

<style>
  .component {
    width: 92vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
