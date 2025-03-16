<script lang="ts">
  import { d } from "../../../states/states.svelte";
  import OneButton from "./OneKey.svelte";
</script>

<div
  class="component"
  class:hidden={d.gameStage === "no_questions" || d.gameStage === "all_done"}
>
  {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as i (i)}
    <OneButton buttonNumber={i} />
  {/each}
</div>

<style>
  .component {
    align-content: start;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
  }
  .component.hidden {
    visibility: hidden; /* use visibility hidden here because I don't want the layout to shift */
  }
</style>
