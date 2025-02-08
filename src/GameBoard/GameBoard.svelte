<script lang="ts">
  import { s } from "../states/states.svelte";
  import AnswerBar from "./AnswerBar/AnswerBar.svelte";
  import KeyPad from "./KayPad/KeyPad.svelte";
  import TilesBar from "./TilesBar/TilesBar.svelte";
</script>

<!-- @component the game view -->
<div class="component">
  <button on:click={() => (s.view = "settings")}>New</button>
  <TilesBar />
  <AnswerBar />
  <KeyPad />
</div>

<style>
</style>
