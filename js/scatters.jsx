function Scatters({ instances, meta }) {
  return (
    <div className="block scatters">
      {meta.features.map(feature =>
        (<div key={feature.name}>
          <ScatterPlotWrapper instances={instances} meta={meta} feature={feature} />
        </div>))}
    </div>
  )
}

function ScatterPlotWrapper({ instances, meta, feature }) {
  return (
    <div className="scatter_plot_wrapper">
      <div className="feature_name">{feature.name}</div>
      <ScatterPlot instances={instances} meta={meta} feature={feature} />
    </div>
  )
}

// for numerical
class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.feature.type === "number") this.draw();
  }

  draw() {
    // set svg
    const svg = d3.select(`#${this.getSvgId()}`);

    // get min max value of data
    const minmax = this.getMinMax();

    // size
    const svgW = svg.style("width").replace("px", "");
    const svgH = svg.style("height").replace("px", "");
    const svgSize = Math.min(svgW, svgH);
    const padding = 15;
    const graphSize = svgSize - padding * 2;

    // scale
    const scaleX = d3.scaleLinear()
      .domain([minmax.feature.min, minmax.feature.max])
      .range([padding, padding + graphSize]);

    const minY = Math.min(minmax.target.min, minmax.predict.min);
    const maxY = Math.max(minmax.target.max, minmax.predict.max);
    const scaleY = d3.scaleLinear()
      .domain([minY, maxY])
      .range([padding, padding + graphSize]);

    // draw axis
    svg.append('line')
      .attr('x1', padding)
      .attr('x2', padding + graphSize)
      .attr('y1', padding + graphSize)
      .attr('y2', padding + graphSize)
      .attr('stroke', '#aaa')
      .attr('stroke-width', '2px');

    svg.append('line')
      .attr('x1', padding)
      .attr('x2', padding)
      .attr('y1', padding)
      .attr('y2', padding + graphSize)
      .attr('stroke', '#aaa')
      .attr('stroke-width', '2px');

    // draw points
    this.props.instances.forEach((instance) => {
      // get points position
      const target = {
        x: scaleX(instance[this.props.feature.name]),
        y: scaleY(instance[this.props.meta.target])
      }
      const predict = {
        x: scaleX(instance[this.props.feature.name]),
        y: scaleY(instance[this.props.meta.predict])
      }
      const diff = target.y - predict.y;
      const color = diff > 0 ? "#00A" : "#A00";

      // draw
      svg.append('circle')
        .attr('cx', predict.x)
        .attr('cy', predict.y)
        .attr('r', 3)
        .attr('fill', color);

      svg.append('line')
        .attr('x1', target.x)
        .attr('x2', predict.x)
        .attr('y1', target.y)
        .attr('y2', predict.y)
        .attr('stroke', color)
        .attr('stroke-width', 1);

    });
  }

  getMinMax() {
    return {
      'feature': getMinMaxValue(this.props.instances, this.props.feature.name),
      'target': getMinMaxValue(this.props.instances, this.props.meta.target),
      'predict': getMinMaxValue(this.props.instances, this.props.meta.predict),
    }
  }

  getSvgId() {
    return `scatter_plot_${this.props.feature.name}`;
  }

  render() {
    return (
      <div className="visualization scatter_plot">
        <svg id={this.getSvgId()} />
      </div>);
  }
}