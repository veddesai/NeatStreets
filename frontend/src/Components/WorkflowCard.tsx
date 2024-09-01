import { motion } from "framer-motion";
import React from "react";

interface WorkflowCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      className="workflow-card  w-full flex flex-col items-center gap-y-1 text-center py-24 max-lg:px-16 shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="icon text-6xl mb-4">{icon}</div>
      <h2 className="title font-bold text-2xl mb-2">{title}</h2>
      <p className="description ">{description}</p>
    </motion.div>
  );
};

export default WorkflowCard;
