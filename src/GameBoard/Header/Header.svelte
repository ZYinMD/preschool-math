<script lang="ts">
  import { restartGame, s } from "../../states/states.svelte";
</script>

<!-- @component the top bar that shows things like "7 / 20", "New", etc -->
<div class="component">
  <div class="progress">
    Progress: {#key s.nowAt}
      <span class="flip">{s.nowAt + 1}</span> / {s.questionsThisGame.length}
    {/key}
  </div>
  <div class="message">Please rotate your phone to landscape mode</div>

  <button class="settings" onclick={() => (s.view = "settings")}
    >Settings</button
  >
  <button class="new" onclick={() => restartGame()}>New Game</button>
</div>

<style>
  .component {
    min-height: min-content;
    display: grid;
    grid:
      "progress message settings new" auto
      /
      auto 1fr auto;
    align-items: end;
    width: 100%;
    padding-top: 5px;
    margin-top: clamp(5px, 4vh, 50px);
    margin-bottom: clamp(5px, 2vh, 50px);
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
    font-size: clamp(12px, 1.45vw, 20px);
    padding-left: 1em;
    padding-right: 1em;
    grid-area: new;
    opacity: 0.7;
  }
  .settings {
    grid-area: settings;
    margin-right: 1em;
  }
  .new {
    grid-area: new;
  }
  span.flip {
    display: inline-block;
    animation: flip 0.2s;
  }
  @keyframes flip {
    0% {
      transform: rotateX(0.5turn);
      opacity: 0;
    }
    100% {
      transform: none;
      opacity: 1;
    }
  }
</style>
