<script lang="ts">
  let { a, b, nth } = $props();
  let total = $derived(a + b);
</script>

<!-- @component One tile contained in a box in the question bar -->
<div class="box">
  <div class="tile" class:a={nth <= a} class:b={nth <= total && nth > a}></div>
</div>

<style>
  .box {
    --box-width: min(4.5vw, 25px);
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
