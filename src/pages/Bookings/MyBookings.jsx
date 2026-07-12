const bookings = [
  { id: 'BK-1001', train: 'Express 101', seat: 'A12', status: 'Confirmed' },
  { id: 'BK-1002', train: 'Night Rail', seat: 'B07', status: 'Pending' },
];

function MyBookings() {
  return (
    <section className="card p-8">
      <div className="mb-4">
        <p className="eyebrow font-bold text-xl">Passenger Portal</p>
       <h2>My bookings</h2>

      </div>
      

      <div className="list-card">
        <table>
          <thead>
            <tr className="bg-zinc-900 ">
              <th scope='col' className='text-white text-left p-4 w-50 font-medium'>Train Name</th>
              <th scope='col' className='text-white text-left p-4 w-50 font-medium'>Train Id</th>
              <th scope='col' className='text-white text-left p-4 w-50 font-medium'>Seat</th>
              <th scope='col' className='text-white'>Status</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-300">
            {bookings.map((booking) => (
            <tr key={booking.id}>              
              <td className='p-4'>{booking.train}</td>
              <td className="p-4">{booking.id}</td>                
              <td className="p-4">
                {booking.id} - Seat {booking.seat}
              </td>
              <td className="p-4">
                <span 
                  className={`font-semibold ${
                    booking.status === "Confirmed"
                      ? "text-green-700"
                      : "text-yellow-700"
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
