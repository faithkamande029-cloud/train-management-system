import { useAuth } from "../../context/AuthContext";

const schedules = [
  { train: 'Express 101', departure: '06:30', arrival: '09:15', platform: '3' },
  { train: 'Night Rail', departure: '21:45', arrival: '00:20', platform: '1' },
];

function ScheduleManagement() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <section className="card">
      <p className="eyebrow">{isAdmin ? "Schedule management" : "Train schedules"}</p>
      <h2>Upcoming train schedules</h2>
      {isAdmin ? (
        <button type="button" className="pill-button primary" style={{ marginBottom: "1rem" }}>
          Add schedule
        </button>
      ) : null}
      <div className="list-card">
        {schedules.map((schedule) => (
          <div key={schedule.train} className="list-row">
            <div>
              <h3>{schedule.train}</h3>
              <p>{schedule.departure} → {schedule.arrival}</p>
            </div>
            <span className="badge">Platform {schedule.platform}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScheduleManagement;
