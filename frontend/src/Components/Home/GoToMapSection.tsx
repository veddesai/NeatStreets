import { motion } from "framer-motion";
import { FaArrowTurnDown } from "react-icons/fa6";

import { Link } from "react-router-dom";

const GoToMapSection : React.FC = () => {
  return (
    <motion.div
      id="map"
      className={`p-16 lg:gap-x-8 flex flex-col gap-y-16 items-center w-full`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-center font-bold text-blue-700 dark:text-yellow-400 text-5xl uppercase">
        Trash Report Map
      </h1>
      <p className="font-thin underline text-center text-blue-700 dark:text-yellow-400 text-3xl uppercase">
        Way to Map{" "}
        <FaArrowTurnDown className="ml-2 font-thin text-center underline inline-block" />
      </p>
      <button className="mx-auto dark:bg-white/5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:shadow-[rgba(0,_0,_0,_0.5)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.3)_0px_1px_1px_0px]">
        <Link to="/trashmap">
          <img className="mx-auto  md:w-5/6" src="/WayToMap.png" alt="" />
        </Link>
      </button>
      <h3 className="font-light text-center text-3xl text-blue-700 dark:text-yellow-400">
        "Cleanliness is Next to Godliness."
      </h3>
    </motion.div>
  );
};

export default GoToMapSection;
