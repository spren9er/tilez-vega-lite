<script lang="ts">
	import { getTileContext } from 'tilez';

	import VegaLiteTileHTML from './VegaLiteTileHTML.svelte';
	import VegaLiteTileSVG from './VegaLiteTileSVG.svelte';

	const { specs } = getTileContext();

	export let data: unknown;
	export let spec: { [key: string]: unknown };
	export let options: { [key: string]: unknown } | undefined = undefined;

	const typeMapping = {
		svg: VegaLiteTileSVG,
		html: VegaLiteTileHTML,
	};

	function componentFor(type: string) {
		if (!Object.keys(typeMapping).includes(type))
			throw new Error(
				`There is no vega-lite tile available for type '${type}'!`,
			);

		return typeMapping[type as 'svg' | 'html'];
	}
</script>

{#if $specs}
	<svelte:component this={componentFor($specs.type)} {data} {spec} {options} />
{/if}
