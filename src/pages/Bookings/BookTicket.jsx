function BookTicket() {
  return (
    <section className="card">
      <p className="eyebrow">Passenger booking</p>
      <h2>Book a ticket</h2>
      <form className="stacked-form">
        <label>
          From
          <input placeholder="Colombo Fort" />
        </label>
        <label>
          To
          <input placeholder="Kandy" />
        </label>
        <label>
          Passenger count
          <input type="number" defaultValue="1" />
        </label>
        <button type="button" className="pill-button primary">Continue</button>
      </form>
    </section>
  );
}

export default BookTicket;
