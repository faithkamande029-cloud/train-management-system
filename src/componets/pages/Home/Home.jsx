import { Link } from 'react-router-dom';

const highlights = [
  { title: 'Live schedules', text: 'Monitor departures, arrivals and route changes from one control panel.' },
  { title: 'Smart bookings', text: 'Allow passengers to reserve tickets with a clear confirmation flow.' },
  { title: 'Admin insights', text: 'Keep staff informed with station, train and reporting tools.' },
];

function Home() {
  return (
    <section className="hero-card">
      <div>
        <p className="eyebrow">Railway operations, simplified</p>
        <h1>Operate trains, stations, schedules and bookings from one clean dashboard.</h1>
        <p className="hero-copy">
          This starter mirrors a railway management experience with dedicated views for staff login, train administration, booking flows and reporting.
        </p>
        <div className="hero-actions">
          <Link to="/dashboard" className="pill-button primary">Open dashboard</Link>
          <Link to="/trains" className="pill-button">View trains</Link>
        </div>
      </div>

      <div className="info-grid">
        {highlights.map((item) => (
          <article key={item.title} className="info-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Home;
