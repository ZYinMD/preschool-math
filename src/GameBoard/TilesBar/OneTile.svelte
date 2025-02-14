<script lang="ts">
  import { scale } from "svelte/transition";

  const { a, b, nth }: { a: number; b: number; nth: number } = $props();
  const total = $derived(a + b);
</script>

<!-- @component One tile contained in a box in the question bar -->
<div class="box">
  {#key total}
    <div
      in:scale={{ start: 0, duration: 100, delay: 20 * nth }}
      class="tile"
      class:a={nth <= a}
      class:b={nth <= total && nth > a}
    ></div>
  {/key}
</div>

<style>
  .box {
    --box-width: calc(var(--tiles-bar-width) / 20);
    width: var(--box-width);
    height: calc(var(--box-width) * 1.4);
    border: 1px solid silver;
    display: grid;
    place-items: center;
  }
  .tile {
    width: calc(var(--box-width) * 0.66);
    height: calc(var(--box-width));
  }
  .a {
    background-color: MediumAquamarine;
  }
  .b {
    background-color: orange;
  }
</style>
