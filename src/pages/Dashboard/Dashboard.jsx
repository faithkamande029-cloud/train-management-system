const metrics = [
  { label: 'Active trains', value: '24' },
  { label: 'Passengers today', value: '1,482' },
  { label: 'Open bookings', value: '318' },
  { label: 'Delayed services', value: '5' },
];

function Dashboard() {
  return (
    <section className="card">
      <p className="eyebrow">Operations overview</p>
      <h2>Today at a glance</h2>
      <div className="metric-grid">
        {metrics.map((item) => (
          <article key={item.label} className="info-card">
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
