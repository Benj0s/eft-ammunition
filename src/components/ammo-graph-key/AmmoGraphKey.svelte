<script>
  import { get } from "svelte/store";
  import { generateHexColourFromString } from "../../services/colour-mapper.service";
  import { ammoKeys } from "../../store.js";

  export let ammunition;

  let selectedKeys;

  ammoKeys.update(() => {
    return ammunition.map(ammo => ammo.id);
  });

  const unsubscribe = ammoKeys.subscribe(keys => {
    selectedKeys = keys;
  });

  function handleKeyClick(keyId) {
    ammoKeys.update(a => {
      const arr = [...a];
      const index = arr.indexOf(keyId);

      if (index > -1) {
        arr.splice(index, 1);
      } else {
        arr.push(keyId);
      }

      return arr;
    });
  }
</script>

<style>
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    padding-left: 0;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  li {
    padding: 20px;
    display: flex;
    align-content: center;
    justify-content: center;
    color: rgb(85, 85, 85);
  }

  button {
    border: 1px solid rgba(170, 170, 170, 0.3);
    border-radius: 6px;
    padding: 10px 20px;
  }

  button.selected {
    background-color: rgba(170, 170, 170, 0.3);
  }

  li svg {
    height: 12px;
    width: 12px;
    opacity: 0.6;
  }
</style>

<div class="ammo-graph-key">
  <ul>
    {#each ammunition as { id, label }}
      <li>
        <button
          on:click={handleKeyClick(id)}
          class={selectedKeys.includes(id) ? 'selected' : ''}>
          <svg>
            <circle
              cx="6"
              cy="6"
              r="5"
              fill={generateHexColourFromString(id)} />
          </svg>
          <span>{label}</span>
        </button>
      </li>
    {/each}
  </ul>
</div>
