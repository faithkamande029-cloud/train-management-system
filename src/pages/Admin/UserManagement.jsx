const users = [
  { 
    id: "OP123",
    name: 'Peris Kairetu', 
    role: 'Operations Manager', 
    status: 'Active'
  },
  {
    id: "BA234", 
    name: 'Silvernus Kiprotich', 
    role: 'Booking Agent', 
    status: 'Active' 
  },
  {
    id: "SO345", 
    name: 'Ramesh Kumar', 
    role: 'Support', 
    status: 'Pending' 
  },
];

function UserManagement() {
  return (
    <section className="card p-5 bg-zinc-300 h-screen">
      {/* title */}
      <p className="font-bold text-center text-2xl uppercase bg-red-500 p-2 text-white">Admin Panel</p>
      <h2 className="font-semibold mb-3 mt-5 text-2xl">User management</h2>
      {/* employee information table */}
      <div className="list-card">
        <table className="w-full table-auto">
          <thead>
            <tr className=" bg-zinc-700">
              <th  scope='col' className='text-white text-left p-4 font-bold text-xl'>Employee ID</th>
              <th  scope='col' className='text-white text-left p-4 font-bold text-xl'>Name</th>
              <th  scope='col' className='text-white text-left p-4 font-bold text-xl'>Role</th>
              <th  scope='col' className='text-white text-left p-4 font-bold text-xl'>Status</th>
            </tr>
          </thead>
          {/* table body */}
          <tbody>
            {users.map((user) => (
            <tr key={user.name} className="list-row">
              <td className="p-4 font-semibold">{user.id}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.role}</td>
              
              {/* status */}
              <td>
                <span 
                className={`font-semibold text-lg p-4 
                  ${user.status === "Active"
                  ? "text-green-600"
                  : "text-gray-500"
                }`}
                >
                  {user.status}
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

export default UserManagement;
