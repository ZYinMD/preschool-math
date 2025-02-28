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
  // the key determine if the tile will be animated. If !animate, it's in practice mode, animate the cyan tiles only when a changes, otherwise only animate orange tiles.
  const key = $derived.by(() => {
    if (!animate && nth <= a) return a;
    return Math.random();
  });
  // when the delay of each tile is different, it looks like the tiles wave from left to right. divided by total so the animation of the whole row takes the same amount of time regardless of the total. When !animate, it's in practice mode, don't delay.
  const delay = $derived.by(() => {
    if (animate) return Math.round((110 / total) * nth);
    return 0;
  });
</script>

<!-- @component One tile contained in a box in the question bar -->
<div class="box">
  {#key key}
    <div
      in:scale={{ start: 0, duration: 85, delay }}
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
