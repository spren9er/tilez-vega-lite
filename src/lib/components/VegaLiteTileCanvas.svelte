<script lang="ts">
	import { getTileContext } from 'tilez';

	import { VegaLite } from '$lib/vegaLite';

	const { specs, context } = getTileContext();

	export let data: unknown;
	export let spec: { [key: string]: unknown };
	export let options: { [key: string]: unknown } | undefined = undefined;

	$: if (!$specs?.hasEmptySize && $context)
		(async () => {
			const vl = new VegaLite(data, spec, $specs.width, $specs.height, options);
			await vl.renderToCanvas($context as CanvasRenderingContext2D);
		})();
</script>
