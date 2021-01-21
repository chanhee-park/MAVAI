function App({ instances, meta }) {
  return (
    <div className="app">
      <Scatters instances={instances} meta={meta} />
      <PCP instances={instances} meta={meta} />
      <Table instances={instances} meta={meta} />
    </div>
  );
}

ReactDOM.render(
  App({ instances: data.instances, meta: data.meta }),
  document.getElementById('root')
);
