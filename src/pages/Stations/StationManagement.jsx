const stations = [
  { name: 'Nairobi Terminus', code: 'CBD', active: true },
  { name: 'Suswa Railway Station', code: 'SRT', active: false },
  { name: 'Mombasa Terminus', code: 'MRT', active: true },
];

function StationManagement() {
  return (
    <section className="card bg-zinc-300 p-8 h-screen text-white">
      <div className="mb-4">
        <h1 className="font-bold text-3xl text-black">Station Control</h1>
        <p className="text-black text-xl">Manage stations</p>

      </div>
      
      {/* list-card */}
      <div className="bg-zinc-700 flex flex-col gap-2">
        {/* terminal table */}
        <table>
          <thead>
            <tr className="bg-zinc-900">
              <th scope='col' className='text-left p-4 w-50 font-medium'>Terminal name</th>
              <th scope='col' className='text-left p-4 w-50 font-medium'>Code Name</th>
              <th scope='col' className='text-left p-4 w-50 font-medium'>Status</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station) => (
              <tr key={station.code} className="">
                <td className='p-4'>{station.name} </td>
                <td className='p-4'>{station.code}</td>
                <td>
                  <span 
                    className={`p-3 ${station.active ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {station.active ? 'Active' : 'Maintenance'}
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

export default StationManagement;
