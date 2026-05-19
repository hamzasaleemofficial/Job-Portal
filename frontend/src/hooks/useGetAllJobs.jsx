import { setAllJobs } from "@/redux/jobSlice";
import { REACT_APP_API_URI } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetAllJobs = () => {

    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(state => state.job);

    useEffect(() =>{

        const fetchAllJobs = async() => {
            try {
                const response = await axios.get(`${REACT_APP_API_URI}/job/getAllJobs?keyword=${searchedQuery}`, {withCredentials: true});
                if(response.data.success){
                    dispatch(setAllJobs(response.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
            
        }
        fetchAllJobs();
    },[])
 
}

export default useGetAllJobs;