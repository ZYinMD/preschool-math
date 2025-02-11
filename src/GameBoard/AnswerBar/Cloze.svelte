<script lang="ts">
  import { d, s } from "../../states/states.svelte";

  type Props = {
    position: "a" | "b" | "c";
  };
  let { position }: Props = $props();

  let playerAnswer = $derived(s.currentAnswer[position]);
  let isEmpty = $derived(playerAnswer === 0);
  let color = $derived.by(() => {
    if (isEmpty) return "grey";
    const correctAnswer = d.currentQuestion[position];
    return correctAnswer === playerAnswer ? "green" : "red";
  });
  let content = $derived(isEmpty ? "" : playerAnswer);
</script>

<!-- @component the square box that starts empty and can be filled with a number -->
{#key content}
  <div class={`box ${color}`} id={`cloze-${position}`}>
    {content}
  </div>
{/key}

<style>
  @keyframes rollout {
    0% {
      transform: scale(1.1);
    }
    100% {
      transform: none;
    }
  }
  @keyframes shake {
    0% {
      transform: translateX(0.1em);
    }
    33% {
      transform: translateX(-0.1em);
    }
    66% {
      transform: translateX(0.1em);
    }
    100% {
      transform: none;
    }
  }
  .box {
    display: grid;
    place-items: center;
    font-size: var(--number-square-font-size);
    color: #0008;
    width: var(--number-square-size);
    height: var(--number-square-size);
    border-radius: var(--number-square-border-radius);
    opacity: 0.9;
  }
  .grey {
    background-color: #eee;
    animation: rollout 0.05s;
  }
  .green {
    background-color: lightgreen;
    animation: rollout 0.05s;
  }
  .red {
    background-color: pink;
    animation: shake 0.15s;
  }
</style>
