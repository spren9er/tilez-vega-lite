<script lang="ts">
	import type { Config, TopLevelSpec } from 'vega-lite';

	import { getTileContext } from 'tilez';

	import { VegaLite } from '$lib/vegaLite';

	const { specs } = getTileContext();

	export let spec: TopLevelSpec;
	export let data: unknown | undefined = undefined;
	export let config: Config | undefined = undefined;

	let svg: string;

	$: if ($specs)
		(async () => {
			const chart = new VegaLite(
				spec,
				$specs.width,
				$specs.height,
				data,
				config,
			);

			svg = (await chart.render()) as string;
		})();
</script>

{#if svg}
	{@html svg}
{/if}
