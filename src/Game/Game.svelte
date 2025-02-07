<script lang="ts">
  import QuestionBar from "../lib/QuestionBar/QuestionBar.svelte";
  import KeyPad from "../lib/KayPad/KeyPad.svelte";
  import { states } from "../states/states.svelte";
  const question = states.currentQuestion.question;
</script>

<!-- @component the game view -->
<div class="component">
  <button on:click={() => (states.view = "settings")}>New</button>
  <QuestionBar a={question[0]} b={question[1]} />
  <KeyPad />
</div>

<style>
</style>
