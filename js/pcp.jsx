
class PCP extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.draw();
  }

  draw() {
    // set svg
    const svg = d3.select(`#parallel-coordinates`);

    // size
    const svgW = svg.style("width").replace("px", "");
    const svgH = svg.style("height").replace("px", "");
    const paddingT = 30;
    const paddingR = 30;
    const paddingL = 30;
    const paddingB = 30;
    const graphW = svgW - (paddingL + paddingR);
    const graphH = svgH - (paddingT + paddingB);

    const scaleDiff = d3.scaleLinear()
      .domain([
        this.props.meta.minmax.diff.min,
        this.props.meta.minmax.diff.max])
      .range([0, 1]);

    // get scales for each feature 
    const scales = {};
    this.props.meta.features.forEach(feature => {
      // get scale of a feature
      const scaleX = d3.scaleLinear()
        .domain([0, this.props.meta.features.length - 1])
        .range([paddingL, paddingL + graphW]);

      const scaleY = d3.scaleLinear()
        .domain([
          this.props.meta.minmax[feature.name].min,
          this.props.meta.minmax[feature.name].max])
        .range([paddingT + graphH, paddingT]);

      scales[feature.name] = { x: scaleX, y: scaleY };
    });

    // set a line function
    const lineBasis = d3.line()
      .x(p => p.x)
      .y(p => p.y)
      .curve(d3.curveLinear);

    // draw line of each instance
    this.props.instances.forEach((instance) => {
      // get points for each feature
      const path_points = this.props.meta.features.map((feature, f_index) => ({
        x: scales[feature.name].x(f_index),
        y: scales[feature.name].y(instance[feature.name])
      }));

      // get color by diff between target and predicted value
      const diff = instance[this.props.meta.predict] - instance[this.props.meta.target];
      const color = colormap(scaleDiff(diff));

      // draw a line
      svg.append('path')
        .attr('d', lineBasis(path_points))
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 1);
    });

    this.props.meta.features.forEach((feature, f_index) => {

      // draw axis line and legend
      svg.append('line')
        .attr('x1', scales[feature.name].x(f_index))
        .attr('x2', scales[feature.name].x(f_index))
        .attr('y1', scales[feature.name].y(this.props.meta.minmax[feature.name].min))
        .attr('y2', scales[feature.name].y(this.props.meta.minmax[feature.name].max))
        .attr('stroke', '#AAA')
        .attr('stroke-width', 2);

      svg.append('text')
        .text(feature.name)
        .attr('x', scales[feature.name].x(f_index))
        .attr('y', scales[feature.name].y(this.props.meta.minmax[feature.name].min) + 8)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'hanging');
    });

    // TODO: 실제 값과 예측 값에 대한 축 추가하기

  }

  render() {
    return (
      <div className="vis-component vis-component__pcp">
        <svg className="parallel-coordinates" id="parallel-coordinates" />
      </div >
    )
  }
}

// TODO: scale 미리 계산해서 meta에 저장
