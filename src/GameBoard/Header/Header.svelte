<script lang="ts">
  import { s } from "../../states/states.svelte";
</script>

<!-- @component the top bar that shows things like "7 / 20", "New", etc -->
<div class="component">
  <div class="progress">Progress: 7 / 20</div>
  <div class="message">Please rotate your phone to landscape mode</div>
  <button class="new" onclick={() => (s.view = "settings")}>New</button>
</div>

<style>
  .component {
    min-height: min-content;
    display: grid;
    grid:
      "progress message new" auto
      /
      auto 1fr auto;
    align-items: end;
    width: 100%;
    padding-top: 5px;
    margin-top: clamp(5px, 4vh, 50px);
    margin-bottom: clamp(5px, 4vh, 50px);
  }
  .progress {
    grid-area: progress;
    font-size: clamp(14px, 2vw, 24px);
  }
  .message {
    grid-area: message;
    text-align: center;
    color: tomato;
    font-size: clamp(14px, 2vw, 24px);
  }
  @media (width > 500px) {
    .message {
      display: none;
    }
  }
  button {
    font-size: clamp(14px, 2vw, 24px);
    padding-left: 1em;
    padding-right: 1em;
    grid-area: new;
  }
</style>
