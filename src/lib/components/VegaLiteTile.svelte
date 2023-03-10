<script lang="ts">
	import type { Config, TopLevelSpec } from 'vega-lite';
	import type { EmbedOptions } from 'vega-embed';

	import { getTileContext } from 'tilez';

	import VegaLiteTileHTML from './VegaLiteTileHTML.svelte';
	import VegaLiteTileSVG from './VegaLiteTileSVG.svelte';

	const { specs } = getTileContext();

	export let spec: TopLevelSpec;
	export let data: unknown | undefined = undefined;
	export let options: EmbedOptions | undefined = undefined;

	const { type } = $specs;

	if (!['html', 'svg'].includes(type)) {
		throw new Error(`There is no Vega-Lite tile available for type '${type}'!`);
	}

	let config: Config | undefined;

	if (type === 'svg') config = options?.config as Config | undefined;
</script>

{#if type === 'html'}
	<VegaLiteTileHTML {spec} {data} {options} />
{:else}
	<VegaLiteTileSVG {spec} {data} {config} />
{/if}
