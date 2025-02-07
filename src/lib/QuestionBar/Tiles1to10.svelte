<script lang="ts">
  import Tile from "./Tile.svelte";
  const array1to10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { a, b } = $props();
</script>

<!-- @component a row of 10 tiles in boxes -->
<div class="component">
  {#each array1to10 as i (i)}
    <Tile {a} {b} nth={i} />
  {/each}
</div>

<style>
  .component {
    display: flex;
  }
</style>
