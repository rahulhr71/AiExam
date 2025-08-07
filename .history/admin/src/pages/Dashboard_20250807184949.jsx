import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Teachers from '../components/Teachers';
import { BellIcon, UserGroupIcon, AcademicCapIcon, ClipboardDocumentCheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useAdmin } from '../context/adminContext';
import Students from '../components/Students';
import TeachersList from '../components/TeachersList'
import StudentsList from '../components/StudentsList';
import ClassesList from '../components/ClassList';
import ExamList from '../components/Exams';
import Features from '../components/Features';
const Dashboard = () => {

  const {activeComponent,setActiveComponent} = useAdmin();
  const [stats, setStats] = useState({
    teachers: 0,
    students: 0,
    classes: 0, 
    exams: 0,   
  });
 
  useEffect(() => {
 
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/admin/dashboard/summery', {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  const handleActionClick = (key) => {
    setActiveComponent(key);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'addTeacher':
        return <div>add</div>;
      case 'addStudent':
        return <div>AddStudents Component</div>;
      case 'addClass':
        return <div>AddClass Component</div>;
      case 'viewTeachers':
        return <TeachersList/>;
      case 'viewStudents':
        return <StudentsList/>
      case 'viewClasses':
        return <ClassesList/>;
      case 'viewExams':
        return <div>viewExams Component</div>;
      case 'teachers':
        return <Teachers />;
      case 'students':
        return <Students/>;
      case 'exams':
        return <ExamList/>;
      case 'new features':
        return <Features/>
      case 'settings and profile':
        return <div>settings Component</div>;
      default:
        return <DashboardOverview stats={stats} onActionClick={handleActionClick} />;
    }
  };

  return (
    <div>
      <Sidebar />
      <div className='absolute top-0 right-0 w-[calc(100%-240px)] min-h-screen bg-gray-100'>
        <div className='flex items-center justify-end bg-white p-3 shadow'>
          <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <BellIcon className="h-6 w-6 text-black" />
            <span className="absolute top-0 right-0 inline-block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button className='ml-4 bg-blue-500 px-4 py-2 hover:bg-blue-600 text-white rounded'>Logout</button>
        </div>
        <div className='p-6'>{renderComponent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
const DashboardOverview = ({ stats, onActionClick }) => {
  const cards = [
    {
      title: 'Teachers',
      count: stats.teachers,
      icon: <UserGroupIcon className="h-8 w-8 text-blue-600" />,
      actionKey: 'viewTeachers',
    },
    {
      title: 'Students',
      count: stats.students,
      icon: <AcademicCapIcon className="h-8 w-8 text-green-600" />,
      actionKey: 'viewStudents',
    },
    {
      title: 'Classes',
      count: stats.classes,
      icon: <ClipboardDocumentCheckIcon className="h-8 w-8 text-purple-600" />,
      actionKey: 'viewClasses',
    },
    {
      title: 'Exams',
      count: stats.exams,
      icon: <ClipboardDocumentCheckIcon className="h-8 w-8 text-yellow-600" />,
      actionKey: 'viewExams',
    },
  ];

  return (
    <div>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Overview</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => onActionClick(card.actionKey)}
            className='bg-white rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition-all flex justify-between items-center'
          >
            <div>
              <h3 className='text-gray-500 text-sm'>{card.title}</h3>
              <p className='text-2xl font-semibold text-gray-800'>{card.count}</p>
            </div>
            {card.icon}
          </div>
        ))}
      </div>

      <div className='mt-8'>
        <h3 className='text-xl font-semibold mb-3'>Quick Actions</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Link to='/dashboard/teachers/add'>  <ActionButton label="Add Teacher" onClick={() => onActionClick('addTeacher')} /> </Link>
          <Link to='/dashboard/students/add'><ActionButton label="Add Student" onClick={() => onActionClick('addStudent')} /></Link>
          <Link to='/dashboard/'><ActionButton label="Add Class" onClick={() => onActionClick('addClass')} /></Link>
        </div>
      </div>
    </div>
  );
};
const ActionButton = ({ label, onClick }) => (
  <div
    className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer transition"
    onClick={onClick}
  >
    <span className="text-gray-800 font-medium">{label}</span>
    <ArrowRightIcon className="h-5 w-5 text-gray-500" />
  </div>
);
