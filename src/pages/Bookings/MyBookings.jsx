const bookings = [
  { id: 'BK-1001', train: 'Express 101', seat: 'A12', status: 'Confirmed' },
  { id: 'BK-1002', train: 'Night Rail', seat: 'B07', status: 'Pending' },
];

function MyBookings() {
  return (
    <section className="card p-8">
      <div className="mb-4">
        <p className="eyebrow font-bold text-2xl uppercase text-center bg-red-500 text-white p-2">Passenger Portal</p>
       <h2 className="mt-3 text-gray-600 text-lg font-semibold">My bookings</h2>

      </div>
      

      <div className="list-card w-full overflow-x-auto bg-zinc-700">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-zinc-900 ">
              <th scope='col' className='text-white text-left p-4 font-bold text-xl'>Train Name</th>
              <th scope='col' className='text-white text-left p-4 font-bold text-xl'>Train Id</th>
              <th scope='col' className='text-white text-left p-4 font-bold text-xl'>Seat</th>
              <th scope='col' className='text-white p-4 text-left font-bold text-xl'>Status</th>
            </tr>
          </thead>
          <tbody className=" text-white">
            {bookings.map((booking) => (
            <tr key={booking.id}>              
              <td className='p-4 font-semibold text-lg'>{booking.train}</td>
              <td className="p-4">{booking.id}</td>                
              <td className="p-4">
                {booking.id} - Seat {booking.seat}
              </td>
              <td className="p-4">
                <span 
                  className={`font-semibold text-lg ${
                    booking.status === "Confirmed"
                      ? "text-green-500"
                      : "text-orange-500"
                   }`}
                >
                  {booking.status}
                </span>
              </td>
              
            </tr>
            ))}
            
          </tbody>
        </table>
        
      </div>
    </section>
  );
}

export default MyBookings;
