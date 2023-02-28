<script lang="ts">
	import type { Config } from 'vega-lite';

	import { getTileContext } from 'tilez';

	import { VegaLite } from '$lib/vegaLite';

	const { specs } = getTileContext();

	type json = { [key: string]: unknown | json };

	export let data: unknown;
	export let spec: json;
	export let options: Config | undefined = undefined;

	let chart: string;

	$: if (!$specs?.hasEmptySize)
		(async () => {
			const vl = new VegaLite(data, spec, $specs.width, $specs.height, options);

			chart = (await vl.render()) as string;
		})();
</script>

{#if chart}
	{@html chart}
{/if}
