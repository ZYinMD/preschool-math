<script lang="ts">
  import AnswerBar from "../lib/AnswerBar/AnswerBar.svelte";
  import KeyPad from "../lib/KayPad/KeyPad.svelte";
  import TilesBar from "../lib/TilesBar/TilesBar.svelte";
  import { states } from "../states/states.svelte";
  const { a, b } = states.currentQuestion.value;
</script>

<!-- @component the game view -->
<div class="component">
  <button on:click={() => (states.view = "settings")}>New</button>
  <TilesBar {a} {b} />
  <AnswerBar />
  <KeyPad />
</div>

<style>
</style>
