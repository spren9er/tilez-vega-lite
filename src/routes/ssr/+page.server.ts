import type { PageServerLoad } from './$types';

import type { TopLevelSpec } from 'vega-lite';

import { VegaLite } from '$lib/vegaLite';

const data = [
  { a: 'A', b: 28 },
  { a: 'B', b: 55 },
  { a: 'C', b: 43 },
  { a: 'D', b: 91 },
  { a: 'E', b: 81 },
  { a: 'F', b: 53 },
  { a: 'G', b: 19 },
  { a: 'H', b: 87 },
  { a: 'I', b: 52 },
];

const spec: TopLevelSpec = {
  data: { values: data },
  mark: 'bar',
  encoding: {
    x: { field: 'a', type: 'nominal', axis: { labelAngle: 0 } },
    y: { field: 'b', type: 'quantitative' },
  },
};

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/vl_theme.json');
  const theme = await response.json();

  const chart = new VegaLite(spec, 400, 300, null, theme);
  const svg = await chart.render();

  return { svg };
};
