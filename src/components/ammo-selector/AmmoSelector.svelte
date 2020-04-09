<script>
  import { displayedAmmo } from "../../store.js";
  import { generateHexColourFromString } from "../../services/colour-mapper.service";

  export let ammunition;

  let selected;
  let selectedAmmo;

  displayedAmmo.update(() => {
    return ammunition[0];
  });

  const unsubscribe = displayedAmmo.subscribe(ammo => {
    selectedAmmo = ammo;
  });

  $: displayedAmmo.update(() => selectedAmmo);
</script>

<style>
  .ammo-selector {
    display: flex;
  }

  .ammo-selector select {
    margin: 0;
  }
</style>

<div class="ammo-selector">
  <select bind:value={selectedAmmo}>
    {#each ammunition as ammo}
      <option value={ammo}>{ammo.label}</option>
    {/each}
  </select>
</div>
