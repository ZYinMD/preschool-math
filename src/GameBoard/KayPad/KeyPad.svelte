<script lang="ts">
  import OneButton from "./OneKey.svelte";
  import { s } from "../../states/states.svelte";
</script>

<div class="component" class:hidden={s.allDone}>
  {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as i (i)}
    <OneButton buttonNumber={i} />
  {/each}
</div>

<style>
  .component {
    align-content: start;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    margin-bottom: clamp(5px, 3vh, 50px);
  }
  .component.hidden {
    visibility: hidden; /* use visibility hidden here because I don't want the layout to shift */
  }
</style>
