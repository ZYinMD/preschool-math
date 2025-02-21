<script lang="ts">
  import { drop, move, pickup } from "./dnd";

  const { buttonNumber }: { buttonNumber: number } = $props();
</script>

<!-- ↓ this component div is what stays in place as a placeholder when the button is being dragged -->
<div class="component">
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
    font-family: consolas, monospace;
    -webkit-tap-highlight-color: #0000;
    width: var(--number-square-size);
    height: var(--number-square-size);
    margin: 1vw;
    padding: 0;
    display: grid;
    place-items: center;
    background-color: var(--green);
    font-size: var(--number-square-font-size);
    color: #0008;
    border: none;
    border-radius: var(--number-square-border-radius);
    transition:
      scale 40ms,
      opacity 40ms;
  }

  .the-number-itself {
    user-select: none;
  }
</style>
