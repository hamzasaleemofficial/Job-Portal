import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";


const Browse = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(state => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  },[])

  return (
    <div>
      <Navbar/>
      <div className="max-w-7xl mx-auto py-10">
        <h1 className="font-bold text-lg my-10">Search Reults ({allJobs.length})</h1>
        <div className="grid grid-cols-3 gap-4 mt-5">
          {
            allJobs.map((job) => {
              return(
                <Job job={job} key={job?._id}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Browse;