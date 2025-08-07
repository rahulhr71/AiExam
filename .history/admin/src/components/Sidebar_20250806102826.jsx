import React from 'react'
import { HomeIcon,AcademicCapIcon ,Cog6ToothIcon    ,SparklesIcon,DocumentTextIcon} from '@heroicons/react/24/solid';
const Sidebar = () => {
  return (
    <div className='fixed h-[100vh] w-60 bg-[#152259]'>
        <div>
            <h1 className='text-white text-2xl font-bold p-4'>Admin Panel</h1> <br /><br />
            <hr  className='text-[#BDBDBD]'/>

        </div>
        <div className='m-auto bg-red-600 w-[90%]  mt-4 '>
           <ul className='flex flex-col gap-2'>
            <li className='bg-green-400 w-full p-2 flex gap-2 text-white'><HomeIcon className="h-6 w-6 text-white" /><span>Dashboard</span></li>
            <li className='bg-green-400 w-full p-2 flex gap-2 text-white'><HomeIcon className="h-6 w-6 text-white" /><span>Teachers</span></li>
            <li className='bg-green-400 w-full p-2 flex gap-2 text-white'><AcademicCapIcon className="h-6 w-6 text-white" /><span>Students</span></li>
            <li className='bg-green-400 w-full p-2 flex gap-2 text-white'><Cog6ToothIcon className="h-6 w-6 text-white" /><span>settings and profile</span></li>
            <li className='bg-green-400 w-full p-2 flex gap-2 text-white'><DocumentTextIcon className="h-6 w-6 text-white" /><span>Exams</span></li>

            
           </ul>
        </div>
       <ul className='flex flex-col gap-2 w-[90%] m-auto mt-10'>
            <li className='bg-green-400 w-full p-2 flex gap-2'><SparklesIcon className="h-6 w-6 text-white" /><span>Exams</span></li>
           
           </ul>
    </div>
  )
}

export default Sidebar
