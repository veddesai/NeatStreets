import ImgCard from "../ImgCard";
import { motion } from "framer-motion";
const TrashSection: React.FC = () => {
  return (
    <motion.div 
      className="relative p-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-bold text-blue-800 uppercase dark:text-yellow-500 text-center text-5xl max-lg:text-4xl">
        What Comes under Trash?
      </h1>
      <div className="flex max-md:flex-col justify-between md:p-12 mt-4 gap-8">
        <ImgCard
          title="Wet Waste"
          imageUrl="/wet_waste.png"
          description="Wet Waste consists of biodegradable materials like food scraps and organic matter. It decomposes naturally and can be composted to reduce landfill use."
        />

        <ImgCard
          title="Dry Waste"
          imageUrl="/dry_waste.png"
          description="Dry Waste includes non-biodegradable materials like plastics, metals, and paper. It can often be recycled, reducing environmental impact."
        />
      </div>
      <h3 className="font-light text-center mt-8 text-3xl text-blue-800 dark:text-yellow-500">
        "Clean Communities, Happy Lives."
      </h3>
    </motion.div>
  );
};

export default TrashSection;
