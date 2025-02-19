<script lang="ts">
  import AnswerBar from "./AnswerBar/AnswerBar.svelte";
  import Header from "./Header/Header.svelte";
  import KeyPad from "./KayPad/KeyPad.svelte";
  import TilesBar from "./TilesBar/TilesBar.svelte";
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
