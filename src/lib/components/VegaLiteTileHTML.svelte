<script lang="ts">
	import type { Config, TopLevelSpec } from 'vega-lite';
	import type { EmbedOptions } from 'vega-embed';

	import vegaEmbed from 'vega-embed';

	import { getTileContext } from 'tilez';

	import { VegaLite } from '$lib/vegaLite';

	const { specs, element } = getTileContext();

	export let spec: TopLevelSpec;
	export let data: unknown | undefined = undefined;
	export let options: EmbedOptions | undefined = undefined;

	$: if ($specs && $element) {
		const vl = new VegaLite(spec, $specs.width, $specs.height, data);

		// eslint-disable-next-line
		const { continuousWidth, continuousHeight } = vl.options.view!;

		const config = (options?.config as Config) || {};

		options = {
			...options,
			config: {
				...config,
				view: {
					...(config?.view || {}),
					continuousWidth,
					continuousHeight,
				},
			},
		};

		vegaEmbed($element as HTMLElement, vl.spec, options);
	}
</script>
