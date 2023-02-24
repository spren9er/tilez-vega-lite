<script lang="ts">
	import { Tile } from 'tilez';

	import VegaLiteTile from '$lib/components/VegaLiteTile.svelte';

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

	const spec = {
		mark: 'bar',
		encoding: {
			x: { field: 'a', type: 'nominal', axis: { labelAngle: 0 } },
			y: { field: 'b', type: 'quantitative' },
		},
	};
</script>

<Tile type="canvas" width="400" height="300">
	<VegaLiteTile {data} {spec} />
</Tile>
