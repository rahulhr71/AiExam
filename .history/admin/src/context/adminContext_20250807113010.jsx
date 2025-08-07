import {  useContext,useState } from "react";
const AdminContext = useContext();
export const AdminProvider= ({ children }) => {
  const [activeComponent, setActiveComponent] = useState('');

  return (
    <AdminContext.Provider value={{ activeComponent, setActiveComponent}}>
      {children}
    </AdminContext.Provider>
  );
}
export const useAdmin = () => useContext(AdminContext);