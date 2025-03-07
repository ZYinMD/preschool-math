<script lang="ts">
  import { d, s } from "../../../states/states.svelte";

  type Props = {
    position: "a" | "b" | "c";
  };
  const { position }: Props = $props();

  const playerAnswer = $derived(s.currentAnswer[position]);
  const isEmpty = $derived(playerAnswer === 0);
  const color = $derived.by(() => {
    if (isEmpty) return "grey";
    const correctAnswer = d.currentQuestion[position];
    return correctAnswer === playerAnswer ? "green" : "red";
  });
  const content = $derived(isEmpty ? "" : playerAnswer);
  function handleClick() {
    if (color === "red") {
      s.currentAnswer[position] = 0; // remove the wrong value
    }
  }
</script>

<!-- @component the square box that starts empty and can be filled with a number -->
{#key content}
  <button
    class={`box ${color}`}
    id={`cloze-${position}`}
    onmousedown={handleClick}
    ontouchstart={handleClick}
    disabled={color !== "red"}
  >
    {content}
  </button>
{/key}

<style>
  @keyframes jiggle {
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
    user-select: none;
  }
  .grey {
    background-color: #eee;
  }
  .green {
    background-color: var(--green);
  }
  .red {
    background-color: pink;
    animation: jiggle 0.15s;
  }
</style>
