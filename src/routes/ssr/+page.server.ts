import { tableFromJSON } from 'apache-arrow';

import { VegaLite } from '$lib/vegaLite';

// demo: vega-lite can deal with arrow table, not just JSON
const data = tableFromJSON([
  { a: 'A', b: 28 },
  { a: 'B', b: 55 },
  { a: 'C', b: 43 },
  { a: 'D', b: 91 },
  { a: 'E', b: 81 },
  { a: 'F', b: 53 },
  { a: 'G', b: 19 },
  { a: 'H', b: 87 },
  { a: 'I', b: 52 },
]);

const spec = {
  mark: 'bar',
  encoding: {
    x: { field: 'a', type: 'nominal', axis: { labelAngle: 0 } },
    y: { field: 'b', type: 'quantitative' },
  },
};

export async function load() {
  const vl = new VegaLite(data, spec, 400, 300);
  const chart = await vl.render();

  return { chart };
}
