<script lang="ts">
  import { s } from "../../states/states.svelte";
  import OneButton from "./OneKey.svelte";
  const { c } = s.currentQuestion.value;
  $: numButtons = c > 10 ? 20 : 10; // show 10 buttons if < 10, else show 20 buttons if < 20
  $: numbers = Array(numButtons)
    .fill(null)
    .map((_item, index) => index + 1); // array of numbers from 1 to 10 (or 20)
</script>

<div class="container">
  {#each numbers as i (i)}
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
