<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import HamburgerIcon from "$lib/Icons/HamburgerIcon.svelte";
  import { restartGame, s } from "../../../states/states.svelte";
</script>

<div class="component">
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <button class="hamburger-button">
        <HamburgerIcon />
      </button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Group>
        <DropdownMenu.Item
          onclick={() => {
            console.log("new game");
            restartGame();
          }}>New game</DropdownMenu.Item
        >
        <DropdownMenu.Separator />

        <DropdownMenu.Item onclick={() => (s.view = "settings")}>
          Settings
        </DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Item onclick={() => console.log("practice mode")}>
          Practice mode
        </DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>

<style>
  .component {
    grid-area: hamburger;
    display: grid;
    align-items: end;
  }
  .hamburger-button {
    padding: 8px;
    margin: 0;
    border-radius: 5px;
    position: relative;
    top: 5px;
    &:hover {
      background-color: #eee;
    }
  }
</style>
