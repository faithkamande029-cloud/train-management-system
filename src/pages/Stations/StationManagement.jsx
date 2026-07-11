const stations = [
  { name: 'Colombo Fort', code: 'CMB', active: true },
  { name: 'Kandy', code: 'KDY', active: true },
  { name: 'Galle', code: 'GLL', active: false },
];

function StationManagement() {
  return (
    <section className="card">
      <p className="eyebrow">Station control</p>
      <h2>Manage stations</h2>
      <div className="list-card">
        {stations.map((station) => (
          <div key={station.code} className="list-row">
            <div>
              <h3>{station.name}</h3>
              <p>{station.code}</p>
            </div>
            <span className="badge">{station.active ? 'Active' : 'Maintenance'}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StationManagement;
