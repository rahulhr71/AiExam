import React from 'react';
import {
  HomeIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  SparklesIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation(); 

  const links = [
    { name: 'Dashboard', icon: <HomeIcon className="h-6 w-6 text-white" />, link: "/dashboard" },
    { name: 'Teachers', icon: <HomeIcon className="h-6 w-6 text-white" />, link: "/dashboard//teachers" },
    { name: 'Students', icon: <AcademicCapIcon className="h-6 w-6 text-white" />, link: "/dashboard/students" },
    { name: 'Settings and Profile', icon: <Cog6ToothIcon className="h-6 w-6 text-white" />, link: "/dashboard/settings" },
    { name: 'Exams', icon: <DocumentTextIcon className="h-6 w-6 text-white" />, link: "/dashboard/exams" },
    { name: 'New Features', icon: <SparklesIcon className="h-6 w-6 text-white" />, link: "/dashboard/new-features" },
  ];

  return (
    <div className="fixed h-[100vh] w-60 bg-[#152259]">
      <div>
        <h1 className="text-white text-2xl font-bold p-4">Admin Panel</h1>
        <br />
        <br />
        <hr className="text-[#BDBDBD]" />
      </div>

      <div className="m-auto w-[90%] mt-4 flex flex-col gap-4">
        {links.map((link, index) => {
          const isActive = location.pathname === link.link;

          return (
            <Link to={link.link} className="w-full" key={index}>
              <div
                className={`w-full p-2 flex gap-3 items-center text-white cursor-pointer rounded-md transition ${
                  isActive ? 'bg-[#1E2A78]' : 'hover:bg-[#1E2A78]'
                }`}
              >
                {link.icon}
                <span className="text-sm">{link.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
