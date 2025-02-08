<script lang="ts">
  import KeyPad from "../lib/KayPad/KeyPad.svelte";
  import QuestionBar from "../lib/TilesBar/TilesBar.svelte";
  import { states } from "../states/states.svelte";
  const { a, b } = states.currentQuestion.value;
</script>

<!-- @component the game view -->
<div class="component">
  <button on:click={() => (states.view = "settings")}>New</button>
  <QuestionBar {a} {b} />
  <KeyPad />
</div>

<style>
</style>
