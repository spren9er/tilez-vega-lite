<script lang="ts">
	import type { PageData } from './$types';

	import { Tile, HTile, VTile } from 'tilez';

	import VegaLiteTile from '$lib/components/VegaLiteTile.svelte';

	export let data: PageData;

	const { theme, barSpec, scatterSpec, areaSpec } = data;
</script>

<div style:width="100%" style:height="100vh">
	<HTile type="svg" innerPadding="30px" outerPadding="15px">
		<VTile>
			<Tile>
				<VegaLiteTile spec={barSpec} options={{ config: theme }} />
			</Tile>
			<Tile>
				<VegaLiteTile spec={scatterSpec} options={{ config: theme }} />
			</Tile>
		</VTile>
		<VTile>
			<Tile height="50%" vAlign="center">
				<VegaLiteTile spec={areaSpec} options={{ config: theme }} />
			</Tile>
		</VTile>
	</HTile>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
