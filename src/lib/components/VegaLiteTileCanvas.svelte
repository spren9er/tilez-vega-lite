<script lang="ts">
	import type { Config } from 'vega-lite';

	import { getTileContext } from 'tilez';

	import { VegaLite } from '$lib/vegaLite';

	const { specs, context } = getTileContext();

	type json = { [key: string]: unknown | json };

	export let data: unknown;
	export let spec: json;
	export let options: Config | undefined = undefined;

	$: if (!$specs?.hasEmptySize && $context)
		(async () => {
			const vl = new VegaLite(data, spec, $specs.width, $specs.height, options);

			await vl.renderToCanvas($context as CanvasRenderingContext2D);
		})();
</script>
