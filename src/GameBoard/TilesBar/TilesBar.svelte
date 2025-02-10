<script lang="ts">
  import { d } from "../../states/states.svelte";
  import OneTile from "./OneTile.svelte";
  const array1to10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const array1to20 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  let { a, b } = $derived(d.currentQuestion);
  let allNumbers = $derived(a + b > 10 ? array1to20 : array1to10);
  $inspect("a", a);
  $inspect("b", b);
</script>

<!-- @component the row of tiles -->
<div class="component">
  {#each allNumbers as i (i)}
    <OneTile {a} {b} nth={i} />
  {/each}
</div>

<style>
  .component {
    display: flex;
  }
</style>
