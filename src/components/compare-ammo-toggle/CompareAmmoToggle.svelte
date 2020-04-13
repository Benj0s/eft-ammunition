<script>
  import { get } from "svelte/store";
  import { compareAllAmmo } from "../../store.js";
  import Switch from "@smui/switch";
  import FormField from "@smui/form-field";

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

  .ammo-toggle-label {
    color: hsla(0, 0%, 87.1%, 0.87);
  }
</style>

<div class="compare-ammo-toggle">
  <FormField>
    <Switch bind:checked />
    <span class="ammo-toggle-label" slot="label">Compare</span>
  </FormField>
</div>
