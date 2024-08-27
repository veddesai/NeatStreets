
import React from "react";

const FormSkeletonLoader: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col fixed items-center py-9 bg-white dark:bg-slate-800">
      <div
        className="form-container rounded-md sm:flex sm:flex-row w-max max-md:w-[75%] max-xs:w-[95%] shadow-lg dark:shadow-slate-900"
      >
        <div className="rounded-md md:w-[60%] p-6 max-md:p-8 dark:bg-slate-800 bg-white dark:text-white text-black">
          <div className="animate-pulse">
            <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
            <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
            <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
            <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
            <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="px-2 gap-10 rounded-md max-sm:hidden flex flex-col justify-center text-center bg-blue-600 dark:bg-blue-900 text-white">
          <div className="animate-pulse">
            <div className="h-12 w-3/4 bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
            <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSkeletonLoader;
