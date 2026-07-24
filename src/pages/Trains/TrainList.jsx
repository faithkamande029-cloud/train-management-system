import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import expressTrain from "../../assets/express-101.jpg";
import nightRail from "../../assets/night-rail.jpg";
import hillLine from "../../assets/hill-line.jpg";

const trains = [
  { id: 1, image: expressTrain, name: 'Express 101', route: 'Nairobi → Mombasa', status: 'On time' },
  { id: 2, image: nightRail, name: 'Night Rail', route: 'Mombasa → Voi ', status: 'Boarding' },
  { id: 3, image:hillLine, name: 'Hill Line', route: 'Nairobi → Nanyuki', status: 'Delayed' },
];

function TrainList() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <section className="card p-5 bg-zinc-200 h-screen">
      {/* section-heading */}
      <div className="flex justify-between items-center">
        {/* heading */}
        <div className='mb-4'>
          <h2 className=" text-2xl font-bold">Trains Routes</h2>
          <p className='text-gray-600'>Check Train and seat Availability </p>
        </div>
        {isAdmin ? (
          <Link to="/trains/add" className="rounded-lg bg-red-500 p-2 text-white">Add train</Link>
        ) : null}
      </div>
      {/* list-card */}
      <div className="mt-5 bg-zinc-400">
        <table className='w-full table-auto border-collapse'>
          <thead>
            <tr className='bg-zinc-900'>
              <th scope='col' className='w-50 p-4 text-left font-medium text-white'>Image</th>
              <th scope='col' className='w-50 p-4 text-left font-medium text-white'>Train</th>
              <th scope='col' className='w-50 p-4 text-left font-medium text-white'>Route</th>
              <th scope='col' className='w-50 p-4 text-left font-medium text-white'>Status</th>
              <th scope='col' className='w-50 p-4 text-left font-medium text-white'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-500'>
            {trains.map((train) => (
              <tr key={train.id} className="">
                <td className='p-4'>
                  <img src={train.image} alt={train.name} className='h-16 w-24 rounded-lg object-cover' />
                </td>
                <td className='w-50 p-4 font-bold'>{train.name}</td>
                <td className='w-50 p-4'>{train.route}</td>

                <td className="row-actions flex gap-3 p-4">
                  <span className='rounded-xl bg-green-100 px-3 py-1 text-sm text-green-700'>{train.status}</span>
                </td>
                <td className='p-4'>
                  {isAdmin ? (
                    <Link
                      className='rounded-2xl bg-red-500 p-2 font-semibold text-white'
                      to="/trains/add"
                    >
                      Add Train
                    </Link>
                  ) : (
                    <Link
                      to={`/trains/${train.id}/booking`}
                      className='rounded-lg bg-red-500 p-2 font-semibold text-white'
                    >
                      View Seats
                    </Link>
                  )}
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        
      </div>
    </section>
  );
}

export default TrainList;
