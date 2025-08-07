import React from 'react'
import { HomeIcon,AcademicCapIcon ,Cog6ToothIcon    ,SparklesIcon,DocumentTextIcon} from '@heroicons/react/24/solid';
const Sidebar = () => {
    const links=[
        { name: 'Dashboard', icon: <HomeIcon className="h-6 w-6 text-white"  />,link:"/" },
        { name: 'Teachers', icon: <HomeIcon className="h-6 w-6 text-white" />,link:"/teachers"  },
        { name: 'Students', icon: <AcademicCapIcon className="h-6 w-6 text-white" />, link:"/students" },
        { name: 'Settings and Profile', icon: <Cog6ToothIcon  className="h-6 w-6 text-white" />, link:"/settings" },
        { name: 'Exams', icon: <DocumentTextIcon className="h-6 w-6 text-white" />, link:"/exams" },
        { name: 'New Features', icon: <SparklesIcon className="h-6 w-6 text-white" />, link:"/new-features" }
    ]
  return (
    <div className='fixed h-[100vh] w-60 bg-[#152259]'>
        <div>
            <h1 className='text-white text-2xl font-bold p-4'>Admin Panel</h1> <br /><br />
            <hr  className='text-[#BDBDBD]'/>
        </div>
        <div className='m-auto  w-[90%]  mt-4 '>
            {
                links.map((link, index) => (
                    <div key={index} className='w-full p-2 flex gap-2 text-white cursor-pointer hover:bg-[#1E2A78]'>
                        {link.icon}
                        <span>{link.name}</span>
                    </div>
                ))
            }
           {/* <ul className='flex flex-col gap-2 font-medium '>
            <li className=' p-2 flex gap-2 text-white cursor-pointer'><HomeIcon className="h-6 w-6 text-white" /><span>Dashboard</span></li>
            <li className=' w-full p-2 flex gap-2 text-white cursor-pointer'><HomeIcon className="h-6 w-6 text-white" /><span>Teachers</span></li>
            <li className=' w-full p-2 flex gap-2 text-white cursor-pointer'><AcademicCapIcon className="h-6 w-6 text-white" /><span>Students</span></li>
            <li className=' w-full p-2 flex gap-2 text-white cursor-pointer'><Cog6ToothIcon className="h-6 w-6 text-white" /><span>settings and profile</span></li>
            <li className=' w-full p-2 flex gap-2 text-white cursor-pointer'><DocumentTextIcon className="h-6 w-6 text-white" /><span>Exams</span></li>

            
           </ul> */}
        </div>
       <ul className='flex flex-col gap-2 w-[90%] m-auto mt-10 font-medium'>
            <li className=' w-full p-2 flex gap-2 text-white cursor-pointer    '><SparklesIcon className="h-6 w-6 text-white" /><span>New Features</span></li>
           
           </ul>
    </div>
  )
}

export default Sidebar
