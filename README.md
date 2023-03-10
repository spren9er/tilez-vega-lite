# ![Tilez-Logo](https://github.com/spren9er/tilez/blob/main/docs/images/tilez_logo.svg?raw=true) tilez - vega-lite

_Vega-Lite_ tile for usage with Svelte layout engine [**_tilez_**](https://github.com/spren9er/tilez).


## Installation

Install **_tilez-vega-lite_** as npm package via

```bash
npm install tilez-vega-lite
```

## Usage

You can use _Vega-Lite_ tile for tile types `'html'` and `'svg'`. Component **VegaLiteTile** has following props:

- **_spec_** _Vega-Lite_ spec
- **_data_** given data as JSON, Apache Arrow table, etc. [optional]
- **_options_** _Vega-Lite_ configuration [optional]

When no **_data_** is given, _Vega-Lite_ **_spec_** must have inline data.

```html
<script lang="ts">
  import { Tile } from 'tilez';
  import { VegaLiteTile } from 'tilez-vega-lite';

  const spec = {
    mark: 'bar',
    encoding: {
      x: { field: 'a', type: 'nominal', axis: { labelAngle: 0 } },
      y: { field: 'b', type: 'quantitative' }
    }
  };

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


  const options = {
    renderer: 'svg',
    actions: false
  };
</script>

<Tile type="html" width="800px" height="600px">
  <VegaLiteTile {spec} {data} {options} />
</Tile>
```

## SSR

Underlying **VegaLite** class can also be used for server side rendering without **_tilez_**, see `ssr` route in example app.
