<script>
  import { generateHexColourFromString } from "../../services/colour-mapper.service";

  export let ammunition;
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
    color: #555;
  }

  li svg {
    height: 20px;
    width: 20px;
  }

  li svg circle {
    fill-opacity: 0.6;
    stroke: rgba(0, 0, 0, 0.5);
  }
</style>

<div class="ammo-graph-key">
  <ul>
    {#each ammunition as { id, label }}
      <li>
        <svg>
          <circle
            cx="10"
            cy="10"
            r="5"
            fill={generateHexColourFromString(id)} />
        </svg>
        <span>{label}</span>
      </li>
    {/each}
  </ul>
</div>
