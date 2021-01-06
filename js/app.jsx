function App(props) {
  return (
    <div className="app">
      <Scatters />
      <Table />
    </div>
  );
}

ReactDOM.render(
  App({}),
  document.getElementById('root')
);