import { Link } from 'react-router-dom';
import frontView from "../../assets/front-view.jpg"
import { ShieldCheck, Clock3, CalendarCheck, Headset } from 'lucide-react';


const highlights = [
  { 
    icon: ShieldCheck, 
    title: 'Safe & Secure', 
    text: 'Your safety is our priority' 
  },
  { 
    icon: Clock3, 
    title: 'On-time Services', 
    text: 'Reliable departures and arrivals' 
  },
  { 
    icon: CalendarCheck, 
    title: 'Smart bookings', 
    text: 'Reserve your ticket in just a few clicks' },
  { 
    icon: Headset, 
    title: 'Admin insights', 
    text: 'We\'re here to help whenever you need us' 
  },
];

function Home() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-black/90">      
      
      {/* Hero */}
      <div
        className='relative z-10 max-w-8xl mx-auto flex items-center justify-between h-[90vh] px-8 bg-cover bg-position-[center_47%] '
        style={{backgroundImage: `url(${frontView})`}}
      >
        <div className="absolute inset-0 bg-zinc-600/20 w-2/5 h-4/5 blur-2xl"></div>
        {/* text to the left */}           
        <div className='w-80 p-2 rounded-2xl '>          
          <h1 className="text-5xl font-bold text-shadow-black leading-tight">Your Journey, 
            <br />
          <span className='text-red-600'>Our Priority</span>
          </h1>
          <h1 className='font-bold text-zinc-300 text-xl mt-2'>Book tickets, check schedules and experience a seamless journey.</h1>
        </div>    
        
        {/*Booking section */}      
        <div className='absolute bottom-20 left-8 w-2/5 max-w-7xl mx-auto mt-12 p-4 '>
          <p className="text-xl font-bold text-white">
            Book your ticket today.
          </p>
          <div className="flex text-center mt-2 ">            
            <Link 
              to="/bookings/new" 
              className="bg-black text-zinc-50 border border-zinc-700 p-2.5 rounded-2xl shadow-lg hover:bg-red-500 w-40 font-semibold"
            >
              Book Train
            </Link>  
          </div>

        </div> 
        
      </div>    

      {/* About section */}
      <div className="info-grid grid grid-cols-4 items-center bg-black text-zinc-100 px-8 pt-3 h-45 mt-2 relative z-10 shadow-2xl border-b-7 border-zinc-700/35 ">
        {highlights.map((item) => {
          const Icon = item.icon

          // info card
          return (
            <div className='flex pt-2 pb-2 gap-2 border-r pr-4 pl-4 border-gray-500 '>            
              <Icon className='w-8 h-8 text-red-600 shrink-0'/>
              <article key={item.title} className="flex flex-col max-w-50">                            
                <h3 className='font-bold'>{item.title}</h3>
                <p className='line-clamp-2 text-gray-400 mt-1'>{item.text}</p>
              </article>

            </div>
            
          );
        })}
      </div>
    
    </section>
  );
}

export default Home;
