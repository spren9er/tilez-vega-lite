<script lang="ts">
  import type { Config, TopLevelSpec } from 'vega-lite';
  import type { EmbedOptions } from 'vega-embed';

  import { getTileContext } from 'tilez';

  import VegaLiteTileHTML from './VegaLiteTileHTML.svelte';
  import VegaLiteTileSVG from './VegaLiteTileSVG.svelte';

  const { specs } = getTileContext();

  interface Props {
    spec: TopLevelSpec;
    data?: unknown | undefined;
    options?: EmbedOptions | undefined;
  }

  let { spec, data = undefined, options = undefined }: Props = $props();

  // Validation of type
  const { type } = $specs;
  if (!['html', 'svg'].includes(type))
    throw new Error(`No Vega-Lite tile available for type '${type}'!`);

  const config = type === 'svg' ? (options?.config as Config) : undefined;
</script>

{#if type === 'html'}
  <VegaLiteTileHTML {spec} {data} {options} />
{:else}
  <VegaLiteTileSVG {spec} {data} {config} />
{/if}
