import React from 'react';
import { AcademicCapIcon, ClipboardDocumentCheckIcon, CalendarDaysIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/solid';

const features = [
  {
    title: 'Smart Exams',
    description: 'Create, schedule, and manage exams with automated result generation.',
    icon: <ClipboardDocumentCheckIcon className="h-10 w-10 text-white" />,
  },
  {
    title: 'Attendance Tracking',
    description: 'Track student attendance efficiently with real-time updates.',
    icon: <CalendarDaysIcon className="h-10 w-10 text-white" />,
  },
  {
    title: 'Class Management',
    description: 'Organize classes, sections, and assign teachers easily.',
    icon: <AcademicCapIcon className="h-10 w-10 text-white" />,
  },
  {
    title: 'Student Profiles',
    description: 'Access detailed information of each student in one place.',
    icon: <UserGroupIcon className="h-10 w-10 text-white" />,
  },
  {
    title: 'Performance Analytics',
    description: 'Visual dashboards to track academic performance and trends.',
    icon: <ChartBarIcon className="h-10 w-10 text-white" />,
  },
];

const Features = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#152259]">Platform Features</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start hover:shadow-lg transition-shadow"
          >
            <div className="bg-[#152259] p-3 rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#152259]">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
