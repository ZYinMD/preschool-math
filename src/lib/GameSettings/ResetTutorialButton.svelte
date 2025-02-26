<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { fly } from "svelte/transition";
  import { persistSettings, s } from "../../states/states.svelte";
  import { sleep } from "../util/sleep";
  let text = $state("Reset tutorial");
</script>

<!-- @component the button to let user see the tutorial again -->
{#if s.settings.showTutorial === false}
  <section>
    <Button
      variant="outline"
      size="sm"
      class="px-3 py-1 h-7 border-gray-300 shadow-none w-[100px]"
      onclick={async () => {
        text = "✔️";
        await sleep(1e3);
        s.settings.showTutorial = true;
        persistSettings();
      }}
    >
      {#key text}
        <span in:fly={{ duration: 200, y: "1em" }}>{text}</span>
      {/key}
    </Button>
  </section>
{/if}

<style>
</style>
