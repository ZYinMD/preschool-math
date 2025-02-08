<script lang="ts">
  import { states } from "../../states/states.svelte";

  let { buttonNumber }: { buttonNumber: number } = $props();

  async function handleKeyPress(buttonNumber: number) {
    if (states.currentQuestion.answer.a === 0) {
      states.currentQuestion.answer.a = buttonNumber;
    } else if (states.currentQuestion.answer.b === 0) {
      states.currentQuestion.answer.b = buttonNumber;
    } else if (states.currentQuestion.answer.c === 0) {
      states.currentQuestion.answer.c = buttonNumber;
    }
  }
</script>

<!-- I could just use pointerdown and pointerup if not for the safari 12 on my son's old ipad -->
<button
  disabled={states.kayPadDisabled}
  onclick={() => {
    console.debug("clicked", buttonNumber);
    handleKeyPress(buttonNumber);
  }}
>
  <span class="the-number-itself">
    {buttonNumber}
  </span>
</button>

<style>
  button {
    /* remove the grey outline on tap on iOS safari? */
    -webkit-tap-highlight-color: #0000;
    width: var(--number-square-size);
    height: var(--number-square-size);
    margin: 1vw;
    padding: 0;
    display: grid;
    place-items: center;
    background-color: LightGreen;
    opacity: 0.9;
    font-size: var(--number-square-font-size);
    color: #0008;
    border: none;
    border-radius: var(--number-square-border-radius);
  }
  /* make the numbers not selectable. This is an issue if it's pressed for too long on touch device */
  button:active {
    transform: scale(1.15);
    opacity: 0.7;
  }
  /* prevent the number from being selected */
  .the-number-itself {
    -webkit-user-select: none; /* Safari */
    user-select: none;
  }
</style>
