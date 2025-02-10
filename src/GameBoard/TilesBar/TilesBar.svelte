<script lang="ts">
  import { d } from "../../states/states.svelte";
  import OneTile from "./OneTile.svelte";
  let { a, b } = $derived(d.currentQuestion);

  $inspect("a", a);
  $inspect("b", b);
</script>

<!-- @component the row of tiles -->
<div class="component">
  {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as i (i)}
    <OneTile {a} {b} nth={i} />
  {/each}
</div>

<style>
  .component {
    display: flex;
  }
</style>
