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
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
      <div className="mb-5 rounded-2xl bg-red-500 px-4 py-3 text-center text-xl font-bold uppercase tracking-[0.2em] text-white">
        Admin Panel
      </div>
      <h2 className="mb-4 text-2xl font-semibold text-zinc-100">User management</h2>
      <div className="overflow-hidden rounded-2xl border border-zinc-800">
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
