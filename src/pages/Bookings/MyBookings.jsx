const bookings = [
  { id: 'BK-1001', train: 'Express 101', seat: 'A12', status: 'Confirmed' },
  { id: 'BK-1002', train: 'Night Rail', seat: 'B07', status: 'Pending' },
];

function MyBookings() {
  return (
    <section className="card">
      <p className="eyebrow">Passenger portal</p>
      <h2>My bookings</h2>
      <div className="list-card">
        {bookings.map((booking) => (
          <div key={booking.id} className="list-row">
            <div>
              <h3>{booking.train}</h3>
              <p>{booking.id} • Seat {booking.seat}</p>
            </div>
            <span className="badge">{booking.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyBookings;
