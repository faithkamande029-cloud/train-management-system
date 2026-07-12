import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const trains = [
  { id: 1, name: 'Express 101', route: 'Mombasa → Voi', status: 'On time' },
  { id: 2, name: 'Night Rail', route: 'Nairobi → Mombasa', status: 'Boarding' },
  { id: 3, name: 'Hill Line', route: 'Nairobi → Nanyuki', status: 'Delayed' },
];

function TrainList() {
  const { user} = useAuth ();

  return (
    <section className="card p-5 bg-zinc-800 h-screen">
      {/* section-heading */}
      <div className="flex justify-between items-center">
        {/* heading */}
        <div className='mb-4'>
          <h2 className=" text-white text-2xl font-bold">Train Management</h2>
          <p className='text-white'>Manage all trains in the System</p>
        </div>
        {/* add train link */}
        <Link to="/trains/add" className="text-white bg-red-500 p-2 rounded-lg">Add train</Link>
      </div>
      {/* list-card */}
      <div className="mt-5">
        <table className='w-full table-auto border-collapse'>
          <thead>
            <tr className='bg-zinc-900'>
              <th scope='col' className='text-left p-4 w-50 font-medium text-white'>Train</th>
              <th scope='col' className='text-left p-4 w-50 font-medium text-white'>Route</th>
              <th scope='col' className='text-left p-4 w-50 font-medium text-white'>Status</th>
              <th scope='col' className='text-left p-4 w-50 font-medium text-white'>Actions</th>
            </tr>          
          </thead>
          <tbody className='divide-y divide-gray-500'>
            {trains.map((train) => (
              <tr key={train.id} className="">
                <td className='p-4 w-50 text-white'>{train.name}</td>
                <td className='p-4 w-50 text-white'>{train.route}</td>
                
                <td className="row-actions flex gap-3 p-4">
                  <span className='bg-green-100 text-green-700 px-3 py-1 rounded-xl text-sm'>{train.status}</span>
                </td>
                <td className='p-4'>
                  {user?.role === "admin" ?(
                    <Link 
                    className='bg-red-500 p-2 rounded-2xl font-semibold text-white' 
                    to="/trains/add"
                    >
                      Add Train
                    </Link>
                  ):(
                    <Link
                      to={`/trains/${train.id}/seats`}
                      className='bg-red-500 p-2 rounded-lg font-semibold text-white'
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
