
import { setAllAppliedJobs } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAppliedJobs = () => {

    const dispatch = useDispatch();
 
    useEffect(() => {

        const fetchAppliedJobs = async() => {

            try {

                const response = await axios.get(`${APPLICATION_API_END_POINT}/getAppliedJobs`, {withCredentials: true});
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