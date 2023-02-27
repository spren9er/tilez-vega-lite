<script lang="ts">
	import { getTileContext } from 'tilez';

	import vegaEmbed from 'vega-embed';

	import { VegaLite } from '$lib/vegaLite';

	const { specs, element } = getTileContext();

	type json = { [key: string]: unknown | json };

	export let data: unknown;
	export let spec: json;
	export let options: json | undefined = undefined;

	$: if ($specs && $element) {
		const vl = new VegaLite(data, spec, $specs.width, $specs.height);

		// eslint-disable-next-line
		const { continuousWidth, continuousHeight } = vl.options.view!;

		options = {
			...options,
			config: {
				...(options?.config || {}),
				view: {
					...((options?.config as json)?.view || {}),
					continuousWidth,
					continuousHeight,
				},
			},
		};

		vegaEmbed($element as HTMLElement, vl.spec, options);
	}
</script>
