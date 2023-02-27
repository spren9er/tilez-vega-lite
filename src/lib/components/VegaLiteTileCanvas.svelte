<script lang="ts">
	import { getTileContext } from 'tilez';

	import { VegaLite } from '$lib/vegaLite';

	const { specs, context } = getTileContext();

	type json = { [key: string]: unknown | json };

	export let data: unknown;
	export let spec: json;
	export let options: json | undefined = undefined;

	$: if (!$specs?.hasEmptySize && $context)
		(async () => {
			const vl = new VegaLite(data, spec, $specs.width, $specs.height, options);

			await vl.renderToCanvas($context as CanvasRenderingContext2D);
		})();
</script>
