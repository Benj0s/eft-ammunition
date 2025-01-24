<script>
  import { onMount } from "svelte";
  import { scaleLinear } from "d3-scale";
  import { maxAndPad, generateTicks } from "./AmmoGraph.service.js";
  import { displayedAmmo, compareAllAmmo } from "../../store.js";

  export let cartridges;

  let selectedAmmo;
  let selectedCartridges;
  let showAll;

  let svg;
  let width = 500;
  let height = 500;

  const padding = { top: 40, right: 40, bottom: 40, left: 40 };
  let maxDamage = maxAndPad(cartridges.map(cartridge => cartridge.damage));
  let maxPen = maxAndPad(cartridges.map(cartridge => cartridge.penetration));

  displayedAmmo.subscribe(ammo => {
    selectedAmmo = ammo;
    refreshGraph();
  });

  compareAllAmmo.subscribe(compare => {
    showAll = compare;
    refreshGraph();
  });

  function refreshGraph() {
    selectedCartridges = cartridges.filter(
      cartridge => showAll || selectedAmmo.id === cartridge.ammunitionId
    );

    if (selectedCartridges.length) {
      maxDamage = maxAndPad(
        selectedCartridges.map(cartridge => cartridge.damage)
      );
      maxPen = maxAndPad(
        selectedCartridges.map(cartridge => cartridge.penetration)
      );
    }
  }

  function alternateTextPosition(index, padding = 8) {
    return index % 2 === 0 ? padding : 0;
  }

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
    padding: 6px;
    height: 100%;
    display: flex;
    background-color: #565656;
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

  .tick line {
    stroke: #7f7f7f;
    stroke-dasharray: 2;
  }

  text {
    font-size: 10px;
    fill: #ddd;
  }

  .armour-class {
    fill: #797979;
  }
  .x-axis text {
    text-anchor: middle;
  }

  .y-axis text {
    text-anchor: end;
  }

  .mark-circle {
    fill: #4e8cb6;
    stroke: #d3d3d3;
    opacity: 0.9;
  }

  .mark-text {
    stroke-width: 2px;
    fill: #ddd;
  }

  .mark-circle:not(.selected),
  .mark-text:not(.selected) {
    opacity: 0.2;
    fill: #ddd;
  }

  @media (max-width: 610px) {
    text {
      font-size: 8px;
      fill: #ddd;
    }
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
          transform="translate(0, {height / 2}) rotate(90)">
          Penetration
        </text>
        {#each yTicks as tick, i}
          <g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
            <line x1={padding.left} x2={xScale(maxDamage)} />
            <text x={padding.left - 4} y="+4">{tick}</text>
            {#if i > 0 && i < yTicks.length - 1}
              <text class="armour-class" x={padding.left + 90} y="-2">
                Armour class {tick / 10}
              </text>
            {/if}
          </g>
        {/each}
      </g>

      <!-- x axis -->
      <g class="axis x-axis">
        <text text-anchor="middle" x={width / 2} y={height - 2}>Damage</text>
        {#each xTicks as tick, i}
          <g class="tick" transform="translate({xScale(tick)},0)">
            <line y1={yScale(0)} y2={yScale(maxPen)} />
            <text y={height - padding.bottom + 10 + alternateTextPosition(i)}>
              {tick}
            </text>
          </g>
        {/each}
      </g>

      <!-- data -->
      {#each selectedCartridges as cartridge}
        <circle
          cx={xScale(cartridge.damage)}
          cy={yScale(cartridge.penetration)}
          r="5"
          class="mark-circle {selectedAmmo.id === cartridge.ammunitionId ? 'selected' : ''}" />
        <text
          x={xScale(cartridge.damage)}
          y={yScale(cartridge.penetration) + 16}
          text-anchor="middle"
          class="mark-text {selectedAmmo.id === cartridge.ammunitionId ? 'selected' : ''}">
          {cartridge.label}
        </text>
      {/each}
    </svg>
  </div>
</div>
