<script lang="ts">
  import { restartGame } from "../../states/helper";
  import { d, s } from "../../states/states.svelte";
  import TilesBar from "../components/TilesBar/TilesBar.svelte";
  import AnswerBar from "./AnswerBar/AnswerBar.svelte";
  import Header from "./Header/Header.svelte";
  import KeyPad from "./KayPad/KeyPad.svelte";
  import Tutorial from "./Tutorial/Tutorial.svelte";

  $inspect("questions this game:", s.questionsThisGame);

  /**
   * on mount, if the game hasn't started yet start it. We do this in an effect because we don't want the game to be already started on page load, we want the game to start after page load, this way the user can see some nice animation.
   * unlike effect in react, with $effect in svelte5 you can't specify what variables to monitor for rerun. The effect will always rerun if anything referenced in the function changes, and it could lead to infinite loops. A trick is that anything referenced inside async code won't be monitored. So, we can put everything in async if we're sure we only want to run once.
   */
  $effect(() => {
    setTimeout(() => {
      if (d.gameStage === "not_started") restartGame();
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
