# ![Tilez-Logo](https://github.com/spren9er/tilez/blob/main/docs/images/tilez_logo.svg?raw=true) tilez - vega-lite

_Vega-Lite_ tiles for usage with Svelte layout engine [**_tilez_**](https://github.com/spren9er/tilez).


## Installation

Install **_tilez-vega-lite_** as npm package via

```
npm install tilez-vega-lite
```

## Usage

You can use _Vega-Lite_ tiles for tile types `'html'`, `'svg'` and `'canvas'`. Component **VegaLiteTile** has following props:

- **_data_** given data as JSON, Apache Arrow table, etc.
- **_spec_** _Vega-Lite_ spec
- **_options_** _Vega-Lite_ configuration [optional]

```html
<script lang="ts">
  import { Tile } from 'tilez';
  import { VegaLiteTile } from 'tilez-vega-lite';

  const data = [
    { a: 'A', b: 28 },
    { a: 'B', b: 55 },
    { a: 'C', b: 43 },
    { a: 'D', b: 91 },
    { a: 'E', b: 81 },
    { a: 'F', b: 53 },
    { a: 'G', b: 19 },
    { a: 'H', b: 87 },
    { a: 'I', b: 52 }
  ];

  const spec = {
    mark: 'bar',
    encoding: {
      x: { field: 'a', type: 'nominal', axis: { labelAngle: 0 } },
      y: { field: 'b', type: 'quantitative' }
    }
  };

  const options = {
    actions: false
  }
</script>

<Tile type="html" width="800px" height="600px">
  <VegaLiteTile {data} {spec} {options} />
</Tile>
```

_**Note:** Several _Vega-Lite_ tiles can't share a single canvas element, there will be rendering issues.
Thus, _Vega-Lite_ tiles of type `'canvas'` are only working for tiles, where parent tile is not of type `'canvas'`._

## SSR

Underlying **VegaLite** object can also be used for server side rendering without **_tilez_**, see `ssr` routes in example app.
