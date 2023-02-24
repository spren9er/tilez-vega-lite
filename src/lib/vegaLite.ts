import { View, parse } from 'vega';
import { type TopLevelSpec, type Config, compile } from 'vega-lite';

type GenericSpec = { [key: string]: unknown };

export class VegaLite {
  private vegaSpec: TopLevelSpec;
  private vegaOptions: Config;

  constructor(
    data: unknown,
    spec: GenericSpec,
    width: number,
    height: number,
    config?: Config,
  ) {
    this.vegaSpec = this.buildSpec(spec, data);
    this.vegaOptions = this.buildConfig(width, height, config);
  }

  public async render() {
    const spec = compile(this.vegaSpec, { config: this.vegaOptions }).spec;
    const view = new View(parse(spec), { renderer: 'none' }).finalize();

    return await view.toSVG();
  }

  public get spec() {
    return this.vegaSpec;
  }

  public get options() {
    return this.vegaOptions;
  }

  private buildSpec(spec: GenericSpec, data: unknown) {
    return {
      ...spec,
      data: { values: data },
      width: 'container',
      height: 'container',
    } as TopLevelSpec;
  }

  private buildConfig(width: number, height: number, config?: Config) {
    const options = { view: {}, ...config };

    options.view = {
      ...options.view,
      continuousWidth: width,
      continuousHeight: height,
    };

    return options;
  }
}
