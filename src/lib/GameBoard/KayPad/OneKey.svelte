<script lang="ts">
  import { dragStart } from "./dnd";
  const { buttonNumber }: { buttonNumber: number } = $props();
</script>

<!-- ↓ the outer div is what stays in place as a placeholder when the button is being dragged. It ensures other numbers don't shift. -->
<div class="component">
  <!-- ↓ the button is the actual number that can be dragged -->
  <button
    data-number={buttonNumber}
    onmousedown={dragStart}
    ontouchstart={(event) => {
      event.preventDefault(); // prevent touch device from generating simulated click event (a compatibility feature to support old websites built for mouse only) because we listen for mouse events too, which can lead to double handling the event
      dragStart(event);
    }}
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
    margin: 1svw;
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
    /* ↓ this affects drag too */
    &:active {
      border: 1px solid white;
      scale: 1.1;
      opacity: 1;
    }
  }

  .the-number-itself {
    user-select: none;
  }
</style>
