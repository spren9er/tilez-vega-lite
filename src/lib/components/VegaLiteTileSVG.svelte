<script lang="ts">
  import type { Config, TopLevelSpec } from 'vega-lite';

  import { getTileContext } from 'tilez';

  import { VegaLite } from '$lib/vegaLite';

  const { specs } = getTileContext();

  interface Props {
    spec: TopLevelSpec;
    data?: unknown | undefined;
    config?: Config | undefined;
  }

  let { spec, data = undefined, config = undefined }: Props = $props();

  let svg: string | undefined = $state();

  $effect(() => {
    if ($specs)
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
  });
</script>

{#if svg}
  {@html svg}
{/if}
