function App(props) {
  return (
    <div className="app">
      <Scatters data={props.data} />
      <Table />
    </div>
  );
}

ReactDOM.render(
  App({ data: data }),
  document.getElementById('root')
);
