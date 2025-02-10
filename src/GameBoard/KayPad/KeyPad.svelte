<script lang="ts">
  import OneButton from "./OneKey.svelte";
</script>

<div class="container">
  {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as i (i)}
    <OneButton buttonNumber={i} />
  {/each}
</div>

<style>
  .container {
    grid-area: answer-buttons;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
  }
</style>
