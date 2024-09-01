import { motion } from "framer-motion";
export const WorkFlow = () => {
  return (
    <motion.div
      className=" mx-auto lg:w-2/3 dark:bg-white/95  my-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        className="dark:opacity-90 my-16 max-md:my-8 shadow-lg dark:shadow-slate-100 mx-auto w-full dark:invert"
        src="/src/assets/workflow.png"
        alt="Loading.."
      />
    </motion.div>
  );
};
