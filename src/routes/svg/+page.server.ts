import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/vl_theme.json');
  const theme = await response.json();

  const bar = await fetch('/barchart.vl.json');
  const barSpec = await bar.json();

  const scatter = await fetch('/scatterchart.vl.json');
  const scatterSpec = await scatter.json();

  const area = await fetch('/areachart.vl.json');
  const areaSpec = await area.json();

  return { theme, barSpec, scatterSpec, areaSpec };
};
