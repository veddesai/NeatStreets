import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
}

interface Post {
  id: string;
  description: string;
  imageUrl: string;
  location: string;
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
  const countReportsByStatus = (posts: Post[]) => {
    return posts.reduce(
      (acc, post) => {
        acc[post.status] = (acc[post.status] || 0) + 1;
        return acc;
      },
      { NEW: 0, IN_PROGRESS: 0, COMPLETED: 0 }
    );
  };

  const reportCounts =
    isAuthenticated && user?.reportedPosts
      ? countReportsByStatus(user.reportedPosts)
      : { NEW: 0, IN_PROGRESS: 0, COMPLETED: 0 };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[90vh]">
        <motion.div
          className="shadow-xl max-w-5xl h-max w-full dark:text-white p-8 "
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div
              title="Profile"
              className={`flex justify-center gap-6 p-4 items-center mb-4`}
            >
              <Link
                className="size-16 border-4 border-white bg-blue-600 text-center text-5xl dark:bg-yellow-500 text-white rounded-full"
                to={"/profile"}
                title="Open Profile"
              >
                {user?.username?.charAt(0)}
              </Link>
              <h1 className="text-4xl font-bold">{user?.fullname}</h1>
            </div>

            <p className="text-lg mb-8">{user?.email}</p>
            <p className="text-sm font-medium mb-4">{user?.role}</p>
            <p className="text-sm font-medium mt-2">{location.address}</p>
            <p className="my-10 text-xl">
              You have posted{" "}
              <span className="font-bold text-blue-800 dark:text-yellow-500">
                {" "}
                {user?.reportedPosts.length}{" "}
              </span>
              reports.
            </p>
            <p className="my-2 text-xl">
              <span className="font-bold">New Reports:</span>{" "}
              <span className="font-bold text-blue-800 dark:text-yellow-500">
                {" "}
                {reportCounts.NEW}
              </span>
            </p>
            <p className="my-2 text-xl">
              <span className="font-bold"> Reports In Progress:</span>{" "}
              <span className="font-bold text-blue-800 dark:text-yellow-500">
                {reportCounts.IN_PROGRESS}
              </span>
            </p>
            <p className="my-2 text-xl">
              <span className="font-bold">Completed Reports:</span>{" "}
              <span className="font-bold text-blue-800 dark:text-yellow-500">
                {reportCounts.COMPLETED}
              </span>
            </p>
            <button
              onClick={logout}
              className="mt-4 bg-blue-600 dark:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
