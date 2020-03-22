<script>
  import Header from "./components/Header.svelte";
  import AmmoGraph from "./components//ammo-graph/AmmoGraph.svelte";

  import ammunitionDataService from "./services/ammunition.data.service.js";
  import cartridgesDataService from "./services/cartridges.data.service.js";

  import cartridges from "./data/cartridges.json";

  export let segment;

  async function fetchData() {
    const ammunition = await ammunitionDataService.list();
    const cartridges = await cartridgesDataService.list();

    return { ammunition, cartridges };
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
</style>

<div class="layout-wrapper">
  <Header {segment} />

  <main>
    {#await fetchData()}
      <p>loading...</p>
    {:then data}
      <AmmoGraph cartridges={data.cartridges} ammunition={data.ammunition} />
    {/await}
  </main>
</div>
