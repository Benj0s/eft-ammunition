<script>
  import Header from "./components/Header.svelte";
  import AmmoGraph from "./components/ammo-graph/AmmoGraph.svelte";

  import cartridgesDataService from "./services/cartridges.data.service.js";

  import cartridges from "./data/cartridges.json";

  export let segment;

  async function fetchData() {
    const cartridges = await cartridgesDataService.list();

    return { cartridges };
  }
</script>

<style>
  :global(body, html, body > div) {
    height: 100%;
  }

  main {
    height: 100%;
  }

  .layout-wrapper {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  main {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="layout-wrapper">
  <Header {segment} />

  <main>
    {#await fetchData()}
      <p>loading...</p>
    {:then data}
      <AmmoGraph cartridges={data.cartridges} />
    {/await}
  </main>
</div>
