<script lang="ts">
  import { scale } from "svelte/transition";
  type Props = {
    a: number;
    b: number;
    nth: number;
    animate?: boolean;
  };
  const { a, b, nth, animate = true }: Props = $props();
  const total = $derived(a + b);
  // the key determine if the tile will be animated. If !animate, it's in practice mode, only animate when `a` changes.
  const key = $derived.by(() => {
    if (animate) return JSON.stringify({ a, b }); // I could use Math.random(), but the derive function will only rerun when some value it referenced changes, so this function needs to reference both a and b in someway.
    return a;
  });
</script>

<!-- @component One tile contained in a box in the question bar -->
<div class="box">
  {#key key}
    <div
      in:scale={{
        start: 0,
        duration: 100,
        delay: Math.round((120 / total) * nth), // when the delay of each tile is different, it looks like the tiles wave from left to right. divided by total so the animation of the whole row takes the same amount of time regardless of the total.
      }}
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
