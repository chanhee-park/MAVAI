function App({ instances, meta }) {
  meta.minmax = getMinMaxAll(instances, meta);

  return (
    <div className="app">
      <Scatters instances={instances} meta={meta} />
      <PCP instances={instances} meta={meta} />
      <Table instances={instances} meta={meta} />
    </div>
  );
}

ReactDOM.render(
  App({ instances: instances, meta: meta }),
  document.getElementById('root')
);

