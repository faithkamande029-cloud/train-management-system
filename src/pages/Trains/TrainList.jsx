import { Link } from 'react-router-dom';

const trains = [
  { id: 1, name: 'Express 101', route: 'Colombo → Kandy', status: 'On time' },
  { id: 2, name: 'Night Rail', route: 'Galle → Colombo', status: 'Boarding' },
  { id: 3, name: 'Hill Line', route: 'Nuwara Eliya → Colombo', status: 'Delayed' },
];

function TrainList() {
  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Train administration</p>
          <h2>Train catalogue</h2>
        </div>
        <Link to="/trains/add" className="pill-button primary">Add train</Link>
      </div>
      <div className="list-card">
        {trains.map((train) => (
          <div key={train.id} className="list-row">
            <div>
              <h3>{train.name}</h3>
              <p>{train.route}</p>
            </div>
            <div className="row-actions">
              <span className="badge">{train.status}</span>
              <Link to={`/trains/${train.id}`}>View</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrainList;
