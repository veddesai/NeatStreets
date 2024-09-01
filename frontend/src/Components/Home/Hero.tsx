import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <motion.div
      className={`p-24 lg:gap-x-8 flex max-lg:flex-col max-lg:gap-y-16 items-center w-full`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="">
        <h1 className=" font-bold text-6xl max-lg:text-4xl  text-center uppercase text-blue-600  dark:text-yellow-400">
          Reporting Trash One Click Away
        </h1>
        <h3 className="m-auto font-[300] text-center mt-10 capitalize w-2/3 text-2xl">
          Efficiently report trash issues using Neatstreets for a cleaner
          community.
        </h3>
      </div>

      <div className="text-center">
        {/* If i need SVGs bg-[url('/src/assets/wave.svg')] dark:bg-[url('/src/assets/dark-wave.svg')]  */}
        <img
          className={` bg-cover shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:shadow-[rgba(0,_0,_0,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.3)_0px_1px_1px_0px] dark:bg-transparent m-auto`}
          src="/src/assets/Hero.png"
          alt="Loading..."
        />
      </div>
    </motion.div>
  );
};

export default Hero;
