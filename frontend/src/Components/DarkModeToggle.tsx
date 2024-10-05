import React, { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from "react-icons/md";
const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }


    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={handleToggle}
      className=" p-2 text-gray-800 dark:text-gray-200"
    >
      {darkMode ? <MdLightMode className='size-6 text-yellow-500' /> : <MdDarkMode className='size-6 text-slate-800'/>}
    </button>
  );
};

export default DarkModeToggle;
