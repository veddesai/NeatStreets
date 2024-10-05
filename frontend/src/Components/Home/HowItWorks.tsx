import { WorkFlow } from "../WorkFlow";
import { motion } from "framer-motion";
const HowItWorks : React.FC = () => {
  return (
    <motion.div
      className="relative p-16 max-sm:p-8 max-md:gap-8 "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-bold text-blue-800 uppercase dark:text-yellow-500 text-center text-5xl max-lg:text-4xl">
        HOW NEATSTREETS WORKS?
      </h1>
      <WorkFlow />
      <h3 className="font-light text-center text-3xl text-blue-800 dark:text-yellow-500">
        "Keep Your Surroundings Clean"
      </h3>
    </motion.div>
  );
};

export default HowItWorks;
