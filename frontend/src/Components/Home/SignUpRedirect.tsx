import { motion } from "framer-motion";
import AuthButton from "../AuthButton";
import { FaUserPlus, FaUserSecret } from "react-icons/fa";

export const SignUpRedirect: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col md:p-12 mt-4 bg-slate-100 dark:bg-slate-900 gap-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-bold text-blue-800 uppercase dark:text-yellow-500 text-center text-5xl max-lg:text-4xl">
        SIGNUP ON NEATSTREETS AS A :
      </h1>
      <div className="flex max-md:flex-col md:p-12 justify-between gap-8">
        <div className="bg-white/5 w-full p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:shadow-[rgba(0,_0,_0,_0.5)_0px_2px_5px_0px,_rgba(0,_0,-8_0,_0.3)_0px_1px_1px_0px] cursor-pointer">
          <h3 className="text-center text-blue-800 dark:text-yellow-500 max-md:text-3xl md:text-4xl font-[1000]  ">
            User
          </h3>
          <FaUserPlus className="my-16 text-8xl mx-auto" />

          <p className="text-xl font-[300] text-center">
            <AuthButton
              type="signUp"
              className="px-4 py-2 bg-blue-800 dark:bg-yellow-500 text-white rounded-full"
            />
          </p>
        </div>
        <div className="bg-white/5 w-full p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:shadow-[rgba(0,_0,_0,_0.5)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.3)_0px_1px_1px_0px] cursor-pointer">
          <h3 className="text-center text-blue-800 dark:text-yellow-500 max-md:text-3xl md:text-4xl font-[1000] ">
            Helper
          </h3>
          <FaUserSecret className="my-16 text-8xl mx-auto" />

          <p className="text-xl font-[300] text-center">
            <AuthButton
              type="signUp"
              className="px-4 py-2 bg-blue-800 dark:bg-yellow-500 text-white rounded-full"
            />
          </p>
        </div>
      </div>
      <h3 className="font-light text-center text-3xl text-blue-800 dark:text-yellow-400">
        "Waste Less, Live More."
      </h3>
    </motion.div>
  );
};
