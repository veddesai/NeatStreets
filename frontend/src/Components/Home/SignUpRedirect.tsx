import { motion } from "framer-motion";
import AuthButton from "../AuthButton";
import { FaUserPlus, FaUserSecret } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export const SignUpRedirect: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user, isAuthenticated } = authContext;

  return (
    <motion.div
      className="flex flex-col p-16 mt-4 bg-slate-100 dark:bg-slate-900 gap-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isAuthenticated ? (
        <div className="text-center">
          <h1 className="font-bold uppercase mb-20 text-blue-800 dark:text-yellow-500 text-5xl max-lg:text-4xl">
            Ready to Make a Difference?
          </h1>
          <h1 className="font-bold mt-10 text-4xl">
            <span className="underline">Welcome back</span>,
            <span className=" text-blue-800 dark:text-yellow-500">
              {user?.fullname}!
            </span>
          </h1>
          <p className="my-20 text-xl">
            You have {user?.reportedPosts.length} 
            &nbsp;reports in progress.
            {/* I was Here */}
          </p>

          <div className="bg-blue-800 dark:bg-yellow-500 my-10 max-lg:mx-8 lg:mx-96 text-2xl text-white px-6 py-2">
            <Link to={"/posts"}>
              Check others's posts or create a new report.
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="font-bold text-blue-800 max-lg:mb-8 uppercase dark:text-yellow-500 text-center text-5xl max-lg:text-4xl">
            SIGNUP ON NEATSTREETS AS A :
          </h1>
          <div className="flex max-md:flex-col md:p-12 justify-between gap-8">
            <div className="bg-blue-800 dark:bg-yellow-500 w-full p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:shadow-[rgba(0,_0,_0,_0.5)_0px_2px_5px_0px,_rgba(0,_0,-8_0,_0.3)_0px_1px_1px_0px] cursor-pointer">
              <h3 className="text-center text-white dark:text-black max-md:text-3xl md:text-4xl font-[1000]  ">
                User
              </h3>
              <FaUserPlus className="my-16 text-white dark:text-black text-8xl mx-auto" />

              <p className="text-xl font-[300] text-center">
                <AuthButton
                  type="signUp"
                  role="END_USER"
                  className="px-4 py-2 bg-white dark:bg-slate-900 dark:text-white rounded-full"
                />
              </p>
            </div>
            <div className="bg-blue-800 dark:bg-yellow-500 w-full p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:shadow-[rgba(0,_0,_0,_0.5)_0px_2px_5px_0px,_rgba(0,_0,-8_0,_0.3)_0px_1px_1px_0px] cursor-pointer">
              <h3 className="text-center text-white dark:text-black max-md:text-3xl md:text-4xl font-[1000] ">
                Helper
              </h3>
              <FaUserSecret className="my-16 text-white dark:text-black text-8xl mx-auto" />

              <p className="text-xl font-[300] text-center">
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

      <h3 className="font-light text-center text-3xl text-blue-800 dark:text-yellow-400">
        "Waste Less, Live More."
      </h3>
    </motion.div>
  );
};
