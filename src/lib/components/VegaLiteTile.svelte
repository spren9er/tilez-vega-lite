<script lang="ts">
	import type { Config } from 'vega-lite';

	import { getTileContext } from 'tilez';

	import VegaLiteTileHTML from './VegaLiteTileHTML.svelte';
	import VegaLiteTileSVG from './VegaLiteTileSVG.svelte';
	import VegaLiteTileCanvas from './VegaLiteTileCanvas.svelte';

	const { specs } = getTileContext();

	type json = { [key: string]: unknown | json };

	export let data: unknown;
	export let spec: json;
	export let options: json | Config | undefined = undefined;

	const typeMapping = {
		html: VegaLiteTileHTML,
		svg: VegaLiteTileSVG,
		canvas: VegaLiteTileCanvas,
	};

	function componentFor(type: string) {
		if (!Object.keys(typeMapping).includes(type))
			throw new Error(
				`There is no Vega-Lite tile available for type '${type}'!`,
			);

		return typeMapping[type as 'html' | 'svg' | 'canvas'];
	}

	function optionsFor(type: string) {
		if (type === 'html') return options;

		return (options as json)?.config;
	}
</script>

{#if $specs}
	<svelte:component
		this={componentFor($specs.type)}
		{data}
		{spec}
		options={optionsFor($specs.type)}
	/>
{/if}
