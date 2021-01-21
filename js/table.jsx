function Table({ instances, meta }) {
  console.log(instances, meta)
  return (
    <div className="vis-component vis-component__table">
      <TableHeader instances={instances} meta={meta} />
      <TableBody instances={instances} meta={meta} />
    </div>
  )
}

function TableHeader({ instances, meta }) {
  return (
    <div className="table__header">
      {meta.features.map(feature => (
        <div className="table__cell__wrapper" key={`table-feature-${feature.name}`}>
          <div className="table__cell">{feature.name}</div>
        </div>
      ))}
    </div>
  )
}

function TableBody({ instances, meta }) {
  return (
    <div className="table__body">
      {instances.map((instance, index) => (
        <div className="table__row__wrapper" key={`instance-row-${index}`}>
          <TableRow instance={instance} meta={meta} instanceIndex={index} />
        </div>
      ))}
    </div>
  )
}

function TableRow({ instance, meta, instanceIndex }) {
  return (<div className="table__row">
    {meta.features.map(feature => (
      <div className="table__cell__wrapper" key={`table-feature-${feature.name}`}>
        {feature.type === "number" &&
          <CellNumerical
            value={instance[feature.name]}
            min={meta.minmax[feature.name].min}
            max={meta.minmax[feature.name].max}
            instanceIndex={instanceIndex}
            featureName={feature.name}
          />}
        {feature.type !== "number" && <div className="table__cell">{instance[feature.name]}</div>}
      </div>
    ))}
  </div>)
}

class CellNumerical extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.draw();
  }

  draw() {
    const svg = d3.select(`#${this.getSvgId()}`);
    const svgW = svg.style("width").replace("px", "");
    const svgH = svg.style("height").replace("px", "");

    const scale = d3.scaleLinear()
      .domain([this.props.min, this.props.max])
      .range([0, svgW ]);

    svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', scale(this.props.value))
      .attr('height', svgH)
      .attr('fill', '#ccc');
  }

  getSvgId() {
    return `cell_bar-chart__${this.props.instanceIndex}-${this.props.featureName}`;
  }

  render() {
    return (
      <div className="visualization vis-cell cell_bar-chart">
        <svg id={this.getSvgId()} />
      </div>);
  }
}
