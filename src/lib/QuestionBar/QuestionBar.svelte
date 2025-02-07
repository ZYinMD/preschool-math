<script lang="ts">
  import Tiles1to10 from "./Tiles1to10.svelte";
  import Tiles1to20 from "./Tiles1to20.svelte";
  const { a, b } = $props();
</script>

<!-- @component the row of tiles -->
<div class="container">
  {#if a + b <= 10}
    <Tiles1to10 {a} {b} />
  {:else}
    <Tiles1to20 {a} {b} />
  {/if}
</div>

<style>
</style>
