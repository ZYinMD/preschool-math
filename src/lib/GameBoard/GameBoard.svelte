<script lang="ts">
  import { restartGame } from "../../states/helper";
  import { d, s } from "../../states/states.svelte";
  import TilesBar from "../components/TilesBar/TilesBar.svelte";
  import AnswerBar from "./AnswerBar/AnswerBar.svelte";
  import Header from "./Header/Header.svelte";
  import KeyPad from "./KayPad/KeyPad.svelte";
  import Tutorial from "./Tutorial/Tutorial.svelte";

  /**
   * on mount, if the game hasn't started yet start it.
   * unlike effect in react, with $effect in svelte5 you can't specify what variables to monitor for rerun. The effect will always rerun if anything referenced in the function changes, and it could lead to infinite loops. A trick is that anything referenced inside async code won't be monitored. So, we can put everything in async if we're sure we only want to run once.
   */
  $effect(() => {
    setTimeout(() => {
      const gameHasStarted = s.questionsThisGame.length > 1;
      if (!gameHasStarted) restartGame();
    }, 0);
  });
</script>

<!-- @component the game view -->
<div class="component">
  <Header />
  <TilesBar {...d.currentQuestion} />
  <AnswerBar />
  <Tutorial />
  <KeyPad />
</div>

<style>
  .component {
    width: min(92svw, (calc(220svh + 30px)));
    height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
