import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((state) => state.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      <motion.div
        className="grid grid-cols-3 gap-4 my-5"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.3 }}
      >
        {allJobs.LatestJobCards <= 0 ? (
          <span>JOBS NOT FOUND</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((item, index) => <LatestJobCards item={item} key={index} />)
        )}
      </motion.div>
    </div>
  );
};

export default LatestJobs;
