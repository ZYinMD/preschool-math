<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<svelte:head>
  <title>Preschool Math</title>
</svelte:head>
{@render children()}
