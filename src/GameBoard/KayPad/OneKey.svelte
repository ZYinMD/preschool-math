<script lang="ts">
  import { drop, move, pickup } from "./dnd";

  let { buttonNumber }: { buttonNumber: number } = $props();
</script>

<!-- ↓ this container div is what stays in place as a placeholder when the button is being dragged -->
<div class="container">
  <button
    data-number={buttonNumber}
    onmousedown={pickup}
    ontouchstart={pickup}
    onmousemove={move}
    ontouchmove={move}
    onmouseup={drop}
    ontouchend={drop}
  >
    <span class="the-number-itself" style="pointer-events: none;">
      {buttonNumber}
    </span>
  </button>
</div>

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
