function App({ instances, meta }) {
  return (
    <div className="app">
        <Scatters instances={instances} meta={meta} />
        <PCP instances={instances} meta={meta}/>
        <Table />
    </div>
  );
}

ReactDOM.render(
  App({ instances: data.instances, meta: data.meta }),
  document.getElementById('root')
);
