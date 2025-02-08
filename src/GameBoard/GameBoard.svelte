<script lang="ts">
  import AnswerBar from "./AnswerBar/AnswerBar.svelte";
  import KeyPad from "./KayPad/KeyPad.svelte";
  import TilesBar from "./TilesBar/TilesBar.svelte";
  import { s } from "../states/states.svelte";
  const { a, b } = s.currentQuestion.value;
</script>

<!-- @component the game view -->
<div class="component">
  <button on:click={() => (s.view = "settings")}>New</button>
  <TilesBar {a} {b} />
  <AnswerBar />
  <KeyPad />
</div>

<style>
</style>
