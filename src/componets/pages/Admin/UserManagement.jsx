const users = [
  { name: 'Nimal Perera', role: 'Operations Manager', status: 'Active' },
  { name: 'Sajini Silva', role: 'Booking Agent', status: 'Active' },
  { name: 'Ramesh Kumar', role: 'Support', status: 'Pending' },
];

function UserManagement() {
  return (
    <section className="card">
      <p className="eyebrow">Admin panel</p>
      <h2>User management</h2>
      <div className="list-card">
        {users.map((user) => (
          <div key={user.name} className="list-row">
            <div>
              <h3>{user.name}</h3>
              <p>{user.role}</p>
            </div>
            <span className="badge">{user.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UserManagement;
