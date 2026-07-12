import { useAuth } from "../../context/AuthContext";
import expressTrain from "../../assets/express-101.jpg";
import hillLine from "../../assets/hill-line.jpg";
import nightRail from "../../assets/night-rail.jpg";


const schedules = [
  {
    id: 1, 
    train: 'Express 101', 
    departure: '06:30', 
    arrival: '09:15',
    platform: '3', 
    image: expressTrain
  },
  {
    id: 2, 
    train: 'Night Rail', 
    departure: '21:45', 
    arrival: '00:20', 
    platform: '1',
    image: nightRail 
  },
  {
    id: 3,
    train: 'Hill Line',
    departure: '07:45',
    arrival: '13:10',
    platform: '2',
    image: hillLine
  }
];

function ScheduleManagement() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <section className="card p-8 bg-zinc-600 h-screen">
      <div>
        {/* eyebrow */}
        <p className="uppercase text-2xl font-semibold ">{isAdmin ? "Schedule management" : "Train schedules"}</p>
        <h2 className="">Upcoming train schedules</h2>

      </div>
      
      {isAdmin ? (
        <button type="button" className="px-5 py-3 rounded-lg bg-black text-white hover:bg-red-500 font-semibold" style={{ marginBottom: "1rem" }}>
          Add schedule
        </button>
      ) : null}

      {/* list-card */}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          // list-row
          <div 
            key={schedule.train} 
            className="flex items-center gap-10 bg-zinc-900 shadow-md"
          >
            <div className="flex items-center gap-5 text-zinc-300 ">
              <img src={schedule.image} alt={schedule.name} className="w-24 h-24 object-cover" />
              <h3>{schedule.train}</h3>
              <p>{schedule.departure} → {schedule.arrival}</p>
            </div>
            <span className="badge text-zinc-300">Platform {schedule.platform}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScheduleManagement;
