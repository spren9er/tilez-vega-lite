import { View, parse } from 'vega';
import { type TopLevelSpec, type Config, compile } from 'vega-lite';

export class VegaLite {
  private vegaSpec: TopLevelSpec;
  private vegaOptions: Config;

  constructor(
    spec: TopLevelSpec,
    width: number,
    height: number,
    data?: unknown,
    config?: Config,
  ) {
    this.vegaSpec = this.buildSpec(spec, data);
    this.vegaOptions = this.buildConfig(width, height, config);
  }

  public async render() {
    const view = this.buildView();

    return await view.toSVG();
  }

  public get spec() {
    return this.vegaSpec;
  }

  public get options() {
    return this.vegaOptions;
  }

  private buildView() {
    const spec = compile(this.vegaSpec, { config: this.vegaOptions }).spec;

    return new View(parse(spec), { renderer: 'none' }).finalize();
  }

  private buildSpec(spec: TopLevelSpec, data?: unknown) {
    let vegaSpec = {
      ...spec,
      width: 'container',
      height: 'container',
    } as TopLevelSpec;

    if (data) vegaSpec = { ...vegaSpec, data: { values: data } };

    return vegaSpec;
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
