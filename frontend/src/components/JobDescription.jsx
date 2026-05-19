import { useDispatch, useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { REACT_APP_API_URI} from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";



const JobDescription = () => {
  
  const {id} = useParams();
  const dispatch = useDispatch();
  const {singleJob} = useSelector(state => state.job);
  const {user} = useSelector(state => state.auth);

  const initallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(initallyApplied);
  console.log(isApplied);
  
  const applyJobHandler = async() => {
    try {
        const response = await axios.get(`${REACT_APP_API_URI}/application/applyJob/${id}`, {withCredentials: true});
        if(response.data.success) {
          setIsApplied(true); // update the local state
          const updatedSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant:user._id}]};
          dispatch(setSingleJob(updatedSingleJob)); // helps us to update the realtime UI date
          toast.success(response.data.message);
        }

    } catch (error) {
        toast.success(error.response.data.message);
    }
  }
  

  useEffect(() => {
    const fetchSingleJob = async() => {
      try {
          const response = await axios.get(`${REACT_APP_API_URI}/job/getJobById/${id}`, {withCredentials: true});
          console.log(response.data.job);
          if(response.data.success){
            dispatch(setSingleJob(response.data.job));

            // Ensure the state is in sync with fetched data
            setIsApplied(response.data.job.applications.some(application => application.applicant === user._id)); 
          }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleJob();
  },[id, dispatch, user?._id])
  return (
    <div>
      <Navbar />
          
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className={"text-blue-700 font-bold"} variant="ghost">
                {singleJob?.position} Positions
              </Badge>
              <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {singleJob?.jobType}
              </Badge>
              <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {singleJob?.salary} USD
              </Badge>
            </div>
          </div>
          <Button
            onClick = {isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#361949]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-5">{singleJob?.description}</h1>
        <div className="my-4">
          <h1 className="font-bold my-1">Role:<span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
          <h1 className="font-bold my-1">Location:<span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
          <h1 className="font-bold my-1">Description:<span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
          <h1 className="font-bold my-1">Experience:<span className="pl-4 font-normal text-gray-800">{singleJob?.experience} Years</span></h1>
          <h1 className="font-bold my-1">Salary:<span className="pl-4 font-normal text-gray-800">{singleJob?.salary} USD</span></h1>
          <h1 className="font-bold my-1">Total Application:<span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
          <h1 className="font-bold my-1">Posted Date:<span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split('T')[0]}</span></h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
