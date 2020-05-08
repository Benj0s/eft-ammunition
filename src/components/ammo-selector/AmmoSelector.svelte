<script>
  import Select, { Option } from "@smui/select";
  import Icon from "@smui/select/icon/index";
  import AmmoIcon from "../../theme/icons/ammo.svg";
  import { displayedAmmo } from "../../store.js";

  export let ammunition;

  let selectedAmmo;

  displayedAmmo.update(() => {
    return ammunition[0];
  });

  // having to set the selectedAmmo using label due to: https://github.com/hperrin/svelte-material-ui/issues/107
  const unsubscribe = displayedAmmo.subscribe(a => (selectedAmmo = a.label));

  $: displayedAmmo.update(() => ammunition.find(a => a.label === selectedAmmo));
</script>

<style>
  .ammo-selector {
    display: flex;
  }
</style>

<div class="ammo-selector">
  <Select
    bind:value={selectedAmmo}
    label="Ammunition"
    variant="outlined"
    withLeadingIcon>
    <span slot="icon">
      <Icon class="material-icons">
        {@html AmmoIcon}
      </Icon>
    </span>
    {#each ammunition as ammo}
      <Option value={ammo.id} selected={ammo.label === selectedAmmo}>
        {ammo.label}
      </Option>
    {/each}
  </Select>
</div>
