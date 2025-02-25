<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

<div class="mt-8 mr-8">
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Group>
        <DropdownMenu.Item onclick={() => console.log("new game")}
          >New game</DropdownMenu.Item
        >
        <DropdownMenu.Item onclick={() => console.log("settings")}>
          Settings
        </DropdownMenu.Item>
        <DropdownMenu.Item onclick={() => console.log("practice mode")}>
          Practice mode
        </DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
