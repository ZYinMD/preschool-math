<script lang="ts">
  import { s } from "../../states/states.svelte";
  import ChevronIcon from "../Icons/ChevronIcon.svelte";
</script>

<!-- @component the practice mode -->
<div class="component">
  <div class="header">
    <button class="back-button" onclick={() => (s.view = "game")}>
      <ChevronIcon />
    </button>
  </div>
</div>

<style>
  .component {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100svw;
    height: 100svh;
    overflow: hidden;
  }
</style>
