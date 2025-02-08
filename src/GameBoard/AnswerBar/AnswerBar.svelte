<script lang="ts">
  import Cloze from "./Cloze.svelte";
</script>

<!-- @component the a + b = c for player to fill -->
<div class="component">
  <Cloze position="a" />
  <span class="operator">+</span>
  <Cloze position="b" />
  <span class="operator">=</span>
  <Cloze position="c" />
</div>

<style>
  .component {
    display: flex;
    align-items: center;
    gap: var(--number-square-font-size);
  }
  .operator {
    font-size: calc(var(--number-square-font-size) * 1.4);
    font-family: Courier, monospace;
  }
</style>
