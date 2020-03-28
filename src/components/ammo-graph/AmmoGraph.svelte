<script>
  import { onMount } from "svelte";
  import { scaleLinear } from "d3-scale";
  import { generateHexColourFromString } from "../../services/colour-mapper.service";
  import { maxAndPad, generateTicks } from "./AmmoGraph.service.js";
  import { ammoKeys } from "../../store.js";

  export let cartridges;

  let selectedCartridges;

  ammoKeys.subscribe(keys => {
    selectedCartridges = cartridges.filter(cartridge =>
      keys.includes(cartridge.ammunitionId)
    );
  });

  let svg;
  let width = 500;
  let height = 500;

  const padding = { top: 40, right: 40, bottom: 40, left: 40 };
  const maxDamage = maxAndPad(cartridges.map(cartridge => cartridge.damage));
  const maxPen = maxAndPad(cartridges.map(cartridge => cartridge.penetration));

  $: xScale = scaleLinear()
    .domain([0, maxDamage])
    .range([padding.left, width - padding.right]);

  $: yScale = scaleLinear()
    .domain([0, maxPen])
    .range([height - padding.bottom, padding.top]);

  $: xTicks = generateTicks(maxDamage);
  $: yTicks = generateTicks(maxPen);

  onMount(resize);

  function resize() {
    ({ width, height } = svg.getBoundingClientRect());
  }
</script>

<style>
  .ammo-graph {
    height: 100%;
    display: flex;
  }

  .graph {
    display: flex;
    flex: 1;
    height: 100%;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  circle {
    fill-opacity: 0.6;
    stroke: rgba(0, 0, 0, 0.5);
  }

  .tick line {
    stroke: #ddd;
    stroke-dasharray: 2;
  }

  text {
    font-size: 12px;
    fill: #999;
  }

  .armour-class {
    fill: #ddd;
  }
  .x-axis text {
    text-anchor: middle;
  }

  .y-axis text {
    text-anchor: end;
  }
</style>

<svelte:window on:resize={resize} />
<div class="ammo-graph">
  <div class="graph">
    <svg bind:this={svg}>
      <!-- y axis -->
      <g class="axis y-axis">
        <text
          text-anchor="middle"
          transform="translate(0, {xScale(maxPen) / 2}) rotate(90)">
          Penetration
        </text>
        {#each yTicks as tick, i}
          <g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
            <line x1={padding.left} x2={xScale(100)} />
            <text x={padding.left - 8} y="+4">{tick}</text>
            {#if i > 0}
              <text class="armour-class" x={padding.left + 90} y="-2">
                Armour class {tick / 10}
              </text>
            {/if}
          </g>
        {/each}
      </g>

      <!-- x axis -->
      <g class="axis x-axis">
        <text text-anchor="middle" x={xScale(maxDamage) / 2} y={height - 2}>
          Damage
        </text>
        {#each xTicks as tick}
          <g class="tick" transform="translate({xScale(tick)},0)">
            <line y1={yScale(0)} y2={yScale(100)} />
            <text y={height - padding.bottom + 16}>{tick}</text>
          </g>
        {/each}
      </g>

      <!-- data -->
      {#each selectedCartridges as cartridge}
        <circle
          cx={xScale(cartridge.damage)}
          cy={yScale(cartridge.penetration)}
          r="5"
          fill={generateHexColourFromString(cartridge.ammunitionId)} />
        <text
          x={xScale(cartridge.damage)}
          y={yScale(cartridge.penetration) + 20}
          text-anchor="middle"
          stroke="gray"
          stroke-width="1px">
          {cartridge.label}
        </text>
      {/each}
    </svg>
  </div>
</div>
