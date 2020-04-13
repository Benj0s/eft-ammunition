<script>
  import { get } from "svelte/store";
  import { compareAllAmmo } from "../../store.js";

  let checked = get(compareAllAmmo);

  $: compareAllAmmo.update(() => checked);
</script>

<style>
  .compare-ammo-toggle {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 20px;
  }

  input[name="compare-ammo"] {
    margin: 0 4px;
  }
</style>

<div class="compare-ammo-toggle">
  <input name="compare-ammo" type="checkbox" bind:checked />
  <label for="compare-ammo">Compare all</label>
</div>
