import { motion } from "framer-motion";
import WorkflowCarousel from "./WorkflowCarousel";
export const WorkFlow = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WorkflowCarousel />
    </motion.div>
  );
};
