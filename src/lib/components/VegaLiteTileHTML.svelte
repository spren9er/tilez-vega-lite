<script lang="ts">
	import { getTileContext } from 'tilez';

	import vegaEmbed from 'vega-embed';

	import { VegaLite } from '$lib/vegaLite';

	const { specs, element } = getTileContext();

	export let data: unknown;
	export let spec: { [key: string]: unknown };
	export let options: { [key: string]: unknown } | undefined = undefined;

	$: if ($specs && $element) {
		const vl = new VegaLite(data, spec, $specs.width, $specs.height);
		vegaEmbed($element as HTMLElement, vl.spec, {
			config: vl.options,
			...options,
		});
	}
</script>
