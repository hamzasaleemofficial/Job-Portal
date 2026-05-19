
import { setAllAppliedJobs } from '@/redux/jobSlice';
import { REACT_APP_API_URI } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAppliedJobs = () => {

    const dispatch = useDispatch();
 
    useEffect(() => {

        const fetchAppliedJobs = async() => {

            try {

                const response = await axios.get(`${REACT_APP_API_URI}/application/getAppliedJobs`, {withCredentials: true});
                if(response.data.success){

                    dispatch(setAllAppliedJobs(response.data.applications));
                }
                
            } catch (error) {
                console.log(error);
            }
        }

        fetchAppliedJobs();
    },[])

}

export default useGetAppliedJobs;