<script>
  import { onMount } from "svelte";
  import { scaleLinear } from "d3-scale";
  import { generateHexColourFromString } from "../services/colour-mapper.service";

  export let ammunition;
  export let cartridges;

  let svg;
  let width = 500;
  let height = 500;

  const padding = { top: 40, right: 40, bottom: 40, left: 40 };
  const maxDamage =
    Math.ceil(
      Math.max.apply(null, cartridges.map(cartridge => cartridge.damage)) / 10
    ) * 10;
  const maxPenetration =
    Math.ceil(
      Math.max.apply(null, cartridges.map(cartridge => cartridge.penetration)) /
        10
    ) * 10;
  const damageTicks = Array(maxDamage / 10 + 1)
    .fill()
    .map((a, i) => i * 10);
  const penetrationTicks = Array(maxPenetration / 10 + 1)
    .fill()
    .map((a, i) => i * 10);

  $: xScale = scaleLinear()
    .domain([0, maxDamage])
    .range([padding.left, width - padding.right]);

  $: yScale = scaleLinear()
    .domain([0, maxPenetration])
    .range([height - padding.bottom, padding.top]);

  $: xTicks = damageTicks;
  $: yTicks = penetrationTicks;

  onMount(resize);

  function resize() {
    ({ width, height } = svg.getBoundingClientRect());
  }
</script>

<style>
  .graph-wrapper {
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

  .x-axis text {
    text-anchor: middle;
  }

  .y-axis text {
    text-anchor: end;
  }
</style>

<svelte:window on:resize={resize} />
<div class="graph-wrapper">
  <div class="graph">
    <svg bind:this={svg}>
      <!-- y axis -->
      <g class="axis y-axis">
        {#each yTicks as tick}
          <g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
            <line x1={padding.left} x2={xScale(100)} />
            <text x={padding.left - 8} y="+4">{tick}</text>
          </g>
        {/each}
      </g>

      <!-- x axis -->
      <g class="axis x-axis">
        {#each xTicks as tick}
          <g class="tick" transform="translate({xScale(tick)},0)">
            <line y1={yScale(0)} y2={yScale(100)} />
            <text y={height - padding.bottom + 16}>{tick}</text>
          </g>
        {/each}
      </g>

      <!-- data -->
      {#each cartridges as cartridge}
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
