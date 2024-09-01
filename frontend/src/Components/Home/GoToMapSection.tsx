import { motion } from "framer-motion"

const GoToMapSection = () => {
  return (
    <motion.div
      className={`p-24 lg:gap-x-8 flex max-lg:flex-col max-lg:gap-y-16 items-center w-full`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <img src="/src/assets/how_it_works.png" alt="" />
        <h1>Go to map</h1>
    </motion.div>
  )
}

export default GoToMapSection