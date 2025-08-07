const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState(''); // Tracks what to render

  const handleActionClick = (action) => {
    setActiveComponent(action);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'addTeacher':
        return <AddTeachers />;
      case 'addStudent':
        return <div>AddStudents Component</div>; // Replace with <AddStudents />
      case 'addClass':
        return <div>AddClass Component</div>; // Replace with <AddClass />
      case 'viewTeachers':
        return <div>ViewAllTeachers Component</div>; // Replace with actual component
      case 'viewStudents':
        return <div>ViewAllStudents Component</div>; // Replace with actual component
      case 'viewClasses':
        return <div>ViewAllClasses Component</div>; // Replace with actual component
      default:
        return <AdminActionsCard onActionClick={handleActionClick} />;
    }
  };

  return (
    <div>
      <Sidebar />
      <div className='absolute top-0 right-0 w-[calc(100%-240px)]'>
        <div className='flex items-center justify-end bg-gray-200 p-3 gap-4'>
          <button className="relative p-2 rounded-full bg-amber-50 hover:bg-gray-100">
            <BellIcon className="h-6 w-6 text-black" />
            <span className="absolute top-0 right-0 inline-block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button className='bg-blue-500 px-3 py-2 hover:bg-[#509CDB] cursor-pointer text-white rounded-sm'>Logout</button>
        </div>
        <div className='p-4'>
          <h1 className='text-2xl font-bold text-gray-700 pl-25'>Dashboard</h1>
          <p className='text-gray-500 pl-25'>Welcome to the admin panel</p>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};
