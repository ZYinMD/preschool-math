<script lang="ts">
  import Tile from "./Tile.svelte";
  const { a, b } = $props();
  const array1to20 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
</script>

<!-- @component a hint row of 20 tiles in boxes -->
<div class="container">
  {#each array1to20 as i (i)}
    <Tile {a} {b} nth={i} />
  {/each}
</div>

<style>
  .container {
    display: flex;
  }
</style>
