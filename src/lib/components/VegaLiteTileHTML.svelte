<script lang="ts">
  import type { Config, TopLevelSpec } from 'vega-lite';
  import type { EmbedOptions } from 'vega-embed';

  import vegaEmbed from 'vega-embed';

  import { getTileContext } from 'tilez';

  import { VegaLite } from '$lib/vegaLite';

  const { specs, element } = getTileContext();

  interface Props {
    spec: TopLevelSpec;
    data?: unknown | undefined;
    options?: EmbedOptions | undefined;
  }

  let { spec, data = undefined, options = undefined }: Props = $props();

  $effect(() => {
    if ($specs && $element) {
      const { width, height } = $specs;
      const vl = new VegaLite(spec, width, height, data);

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
  });
</script>
