<script lang="ts">
  import { restartGame, s } from "../states/states.svelte";
  import AnswerBar from "./AnswerBar/AnswerBar.svelte";
  import KeyPad from "./KayPad/KeyPad.svelte";
  import Progress from "./Progress/Progress.svelte";
  import TilesBar from "./TilesBar/TilesBar.svelte";
  $effect(() => {
    restartGame();
  });
</script>

<!-- @component the game view -->
<div class="component">
  <button onclick={() => (s.view = "settings")}>New</button>
  <Progress />
  <TilesBar />
  <AnswerBar />
  <KeyPad />
</div>

<style>
</style>
