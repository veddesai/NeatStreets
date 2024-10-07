import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Navbar from "../Components/Navbar";
import { useLocation } from "../context/LocationContext";



enum Role {
  END_USER = "END_USER",
  ADMIN = "ADMIN",
  HELPER = "HELPER",
}

interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  fullname: string;
  points: number;
  reportedPosts?: Post[];
  assignedPosts?: Post[];
}

interface Post {
  id: string;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
  address: string;
  reportedAt: string;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED";
  reportedBy: User;
  assignedTo?: User;
  completionTime?: string;
}

const Profile: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user, isAuthenticated, logout } = authContext;
  const { location } = useLocation();

  // Count reports by their status
  const countReportsByStatus = (posts: Post[]) => {
    return posts.reduce(
      (acc, post) => {
        acc[post.status] = (acc[post.status] || 0) + 1;
        return acc;
      },
      { NEW: 0, IN_PROGRESS: 0, COMPLETED: 0 }
    );
  };

  // Report counts for user's own reports
  const reportCounts =
    isAuthenticated && user?.reportedPosts
      ? countReportsByStatus(user.reportedPosts)
      : { NEW: 0, IN_PROGRESS: 0, COMPLETED: 0 };

  // Report counts for reports assigned to the user
  const assignedReportCounts =
    isAuthenticated && user?.assignedPosts
      ? countReportsByStatus(user.assignedPosts)
      : { NEW: 0, IN_PROGRESS: 0, COMPLETED: 0 };

  return (
    <>
      <Navbar />
      <div className="relative p-6 bg-white rounded shadow-md w-full max-w-4xl mx-auto dark:bg-[#1c1f26]">
        <h3 className="text-2xl font-semibold mb-6 dark:text-white">
          User Profile
        </h3>

        <div className="relative flex items-center space-x-4 mb-6">

          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-semibold">
            {user?.fullname ? user.fullname[0] : "U"} 
          </div>
          <div className="relative flex flex-col gap-2">
            <h4 className="text-lg text-blue-800 dark:text-yellow-500 font-medium ">
              {user?.fullname ?? "No Name"} 
            </h4>
            <p className="text-sm dark:text-gray-400">{location?.address}</p>
            <p className="text-sm dark:text-gray-400">{user?.email}</p>
            <p className="text-sm dark:text-gray-400">{user?.role}</p>
            <button
              onClick={logout}
              className="bg-red-600 w-max text-white px-4 py-2 rounded mt-2"
              >
              Logout
            </button>
          </div>
        </div>


        <div className="space-y-6">
          {user?.reportedPosts && (
            <>
              <h4 className="text-xl font-semibold dark:text-white">
                Report Summary
              </h4>
              <div className="relative grid max-sm:grid-cols-1 grid-cols-3 gap-4">
                <div className="relative p-4 bg-gray-200 dark:bg-gray-700 rounded">
                  <h5 className="text-sm dark:text-gray-400">New Reports</h5>
                  <p className="text-lg font-bold dark:text-white">
                    {reportCounts.NEW}
                  </p>
                </div>
                <div className="relative p-4 bg-gray-200 dark:bg-gray-700 rounded">
                  <h5 className="text-sm dark:text-gray-400">In Progress</h5>
                  <p className="text-lg font-bold dark:text-white">
                    {reportCounts.IN_PROGRESS}
                  </p>
                </div>
                <div className="relative p-4 bg-gray-200 dark:bg-gray-700 rounded">
                  <h5 className="text-sm dark:text-gray-400">Completed</h5>
                  <p className="text-lg font-bold dark:text-white">
                    {reportCounts.COMPLETED}
                  </p>
                </div>
              </div>
            </>
          )}

          {user?.assignedPosts && (
            <>
              <h4 className="text-xl font-semibold dark:text-white">
                Assigned Reports
              </h4>
              <div className="relative grid max-sm:grid-cols-1 grid-cols-3 gap-4">
                <div className="relative p-4 bg-gray-200 dark:bg-gray-700 rounded">
                  <h5 className="text-sm dark:text-gray-400">New Assigned</h5>
                  <p className="text-lg font-bold dark:text-white">
                    {assignedReportCounts.NEW}
                  </p>
                </div>
                <div className="relative p-4 bg-gray-200 dark:bg-gray-700 rounded">
                  <h5 className="text-sm dark:text-gray-400">In Progress</h5>
                  <p className="text-lg font-bold dark:text-white">
                    {assignedReportCounts.IN_PROGRESS}
                  </p>
                </div>
                <div className="relative p-4 bg-gray-200 dark:bg-gray-700 rounded">
                  <h5 className="text-sm dark:text-gray-400">Completed</h5>
                  <p className="text-lg font-bold dark:text-white">
                    {assignedReportCounts.COMPLETED}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
