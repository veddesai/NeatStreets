import { motion } from "framer-motion";
import AuthButton from "../AuthButton";
import { FaUserPlus, FaUserSecret } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";


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
  reportedPosts?: Post[];
  assignedPosts?: Post[];
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

export const SignUpRedirect: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user, isAuthenticated } = authContext;

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

  const assignedReportCounts =
    isAuthenticated && user?.assignedPosts
      ? countReportsByStatus(user.assignedPosts)
      : { NEW: 0, IN_PROGRESS: 0, COMPLETED: 0 };

  return (
    <motion.div
      className="relative flex flex-col p-16 gap-8 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

    

      {isAuthenticated ? (
        user?.role === Role.END_USER ? (
          <div className="text-center relative z-20">
            <h1 className="font-bold uppercase mb-16 text-blue-800 dark:text-yellow-500 text-5xl max-lg:text-4xl">
              Ready to Make a Difference?
            </h1>
            <h1 className="font-bold mt-10 text-4xl">
              <span className="underline">Welcome back</span>,
              <span className=" text-blue-800 dark:text-yellow-500">
                {user?.fullname}!
              </span>
            </h1>
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

            <div className="bg-blue-800 dark:bg-yellow-500 my-10 max-lg:mx-8 lg:mx-96 text-2xl text-white px-6 py-2">
              <Link to={"/posts"}>
                Check others' posts or create a new report.
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center relative z-20">
            <h1 className="font-bold uppercase mb-20 text-blue-800 dark:text-yellow-500 text-5xl max-lg:text-4xl">
              Welcome, Helper!
            </h1>
            <h1 className="font-bold text-4xl">
              <span className="underline">Hi</span>,
              <span className="text-blue-800 dark:text-yellow-500">
                {user?.fullname}!
              </span>
            </h1>
            <p className="my-10 text-xl">
              You have been assigned{" "}
              <span className="font-bold text-blue-800 dark:text-yellow-500">
                {user?.assignedPosts.length}
              </span>{" "}
              reports.
            </p>
            <p className="my-2 text-xl">
              <span className="font-bold">New Reports:</span>{" "}
              <span className="font-bold text-blue-800 dark:text-yellow-500">
                {assignedReportCounts.NEW}
              </span>
            </p>
            <p className="my-2 text-xl">
              <span className="font-bold">Reports In Progress:</span>{" "}
              <span className="font-bold text-blue-800 dark:text-yellow-500">
                {assignedReportCounts.IN_PROGRESS}
              </span>
            </p>
            <p className="my-2 text-xl">
              <span className="font-bold">Completed Reports:</span>{" "}
              <span className="font-bold text-blue-800 dark:text-yellow-500">
                {assignedReportCounts.COMPLETED}
              </span>
            </p>

            <div className="bg-blue-800 dark:bg-yellow-500 my-10 max-lg:mx-8 lg:mx-96 text-2xl text-white px-6 py-2">
              <Link to={"/posts"}>
                View Nearby Reports to get assigned
              </Link>
            </div>
          </div>
        )
      ) : (
        <div>
          <h1 className="font-bold text-blue-800 max-lg:mb-8 uppercase dark:text-yellow-500 text-center text-5xl max-lg:text-4xl">
            SIGNUP ON NEATSTREETS AS A :
          </h1>
          <div className="flex max-md:flex-col md:p-12 justify-between gap-8">
            <div className="bg-blue-800 dark:bg-yellow-500 w-full p-4 shadow-lg cursor-pointer">
              <h3 className="text-center text-white dark:text-black max-md:text-3xl md:text-4xl font-bold">
                User
              </h3>
              <FaUserPlus className="my-16 text-white dark:text-black text-8xl mx-auto" />
              <p className="text-xl font-light text-center">
                <AuthButton
                  type="signUp"
                  role="END_USER"
                  className="px-4 py-2 bg-white dark:bg-slate-900 dark:text-white rounded-full"
                />
              </p>
            </div>
            <div className="bg-blue-800 dark:bg-yellow-500 w-full p-4 shadow-lg cursor-pointer">
              <h3 className="text-center text-white dark:text-black max-md:text-3xl md:text-4xl font-bold">
                Helper
              </h3>
              <FaUserSecret className="my-16 text-white dark:text-black text-8xl mx-auto" />
              <p className="text-xl font-light text-center">
                <AuthButton
                  type="signUp"
                  role="HELPER"
                  className="px-4 py-2 bg-white dark:bg-slate-900 dark:text-white rounded-full"
                />
              </p>
            </div>
          </div>
        </div>
      )}

      <h3 className="font-light text-center text-3xl text-blue-800 dark:text-yellow-500">
        "Waste Less, Live More."
      </h3>
    </motion.div>
  );
};
