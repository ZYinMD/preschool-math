<script lang="ts">
  import { s } from "../../../states/states.svelte";
  import OneTile from "./OneTile.svelte";
  type Props = {
    a: number;
    b: number;
    animate?: boolean;
  };
  const { a, b, animate = true }: Props = $props();
</script>

<!-- @component the row of tiles -->
<div class="component" class:hidden={s.allDone}>
  <div class="tiles">
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as i (i)}
      <OneTile {a} {b} nth={i} {animate} />
    {/each}
  </div>
  <div class="divider"></div>
</div>

<style>
  .component {
    display: grid;
    grid:
      "only" auto
      /
      auto;
    place-items: center;
    margin-bottom: clamp(5px, 4svh, 50px);
  }
  .component.hidden {
    visibility: hidden; /* use visibility hidden here because I don't want the layout to shift */
  }
  .tiles {
    grid-area: only;
    display: flex;
  }
  .divider {
    grid-area: only;
    width: 1px;
    height: min(calc(var(--tiles-bar-width) / 6), 13svh);
    background-color: silver;
  }
</style>
