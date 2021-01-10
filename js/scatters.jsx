function Scatters({ instances, meta }) {
  return (
    <div className="vis-component vis-component__scatters">
      {meta.features.map(feature =>
      (<div key={feature.name}>
        <ScatterPlotWrapper instances={instances} meta={meta} feature={feature} />
      </div>))}
    </div>
  )
}

// wrapper는 자료형에 따라 다른 그래프를 띄우기 위한 도구로 사용할 예정임
// 숫자, 종류 -> 기본 스캐터 플롯 그림
// 종류 -> 박스플롯 추가
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

    const scaleDiff = d3.scaleLinear()
      .domain([
        this.props.meta.minmax.diff.min,
        this.props.meta.minmax.diff.max])
      .range([0, 1]);

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

      // get point color
      const diff = instance[this.props.meta.predict] - instance[this.props.meta.target];
      const color = colormap(scaleDiff(diff));

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
      'feature': getMinMaxNumerical(this.props.instances, this.props.feature.name),
      'target': getMinMaxNumerical(this.props.instances, this.props.meta.target),
      'predict': getMinMaxNumerical(this.props.instances, this.props.meta.predict),
    }
  }

  getSvgId() {
    return `scatter-plot__${this.props.feature.name}`;
  }

  render() {
    return (
      <div className="visualization scatter_plot">
        <svg id={this.getSvgId()} />
      </div>);
  }
}