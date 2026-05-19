import { setAllAdminJobs} from "@/redux/jobSlice";
import { REACT_APP_API_URI } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetAllAdminJobs = () => {

    const dispatch = useDispatch();

    useEffect(() =>{
        const fetchAllAdminJobs = async() => {

            try {
                const response = await axios.get(`${REACT_APP_API_URI}/job/getAdminJobs`, {withCredentials: true});
                if(response.data.success){
                    dispatch(setAllAdminJobs(response.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
            
        }
        fetchAllAdminJobs();
    },[])
 
}

export default useGetAllAdminJobs;