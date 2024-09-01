import { motion } from "framer-motion";

interface CardProps {
  imageUrl: string;
  title?: string;
  description?: string;
}

const ImgCard: React.FC<CardProps> = ({ imageUrl, title, description }) => {
  return (
    <motion.div
      className="bg-white/5 w-full p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:shadow-[rgba(0,_0,_0,_0.5)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.3)_0px_1px_1px_0px] cursor-pointer
"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-center max-md:text-3xl md:text-4xl font-[600] ">
        {title}
      </h3>
      <img src={imageUrl} alt="Loading..." className="mt-2 lg:w-2/3 mx-auto" />
      <p className="text-xl font-[300] text-center">{description}</p>
    </motion.div>
  );
};

export default ImgCard;
