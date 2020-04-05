<script>
  import ammunitionDataService from "../services/ammunition.data.service.js";
  import AmmoSelector from "./ammo-selector/AmmoSelector.svelte";

  async function fetchData() {
    const ammunition = await ammunitionDataService.list();

    return { ammunition };
  }
</script>

<style>
  header {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #454545;
    color: #dedede;
  }

  .header-title {
    display: flex;
    flex-direction: column;
  }

  .header-title h2 {
    margin: 0;
    font-weight: 200;
    letter-spacing: 6px;
    line-height: 20px;
    margin-bottom: 4px;
  }

  .header-title h1 {
    margin: 0;
    font-size: 2.3rem;
    font-weight: 900;
    line-height: 32px;
  }

  @media (max-width: 610px) {
    header {
      flex-direction: column;
    }

    header :global(.ammo-selector select) {
      width: 100%;
      margin-top: 10px;
    }
  }

  @media (max-width: 390px) {
    .header-title h1 {
      font-size: 2rem;
    }
  }

  @media (max-width: 350px) {
    .header-title h1 {
      font-size: 1.6rem;
    }

    .header-title h2 {
      font-size: 1rem;
      letter-spacing: 4px;
    }
  }
</style>

<header>
  <div class="header-title">
    <h1>Ammunition Graph</h1>
    <h2>Escape from Tarkov</h2>
  </div>
  {#await fetchData() then data}
    <AmmoSelector ammunition={data.ammunition} />
  {/await}
</header>
