import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { REACT_APP_API_URI } from '@/utils/constant';
import axios from 'axios';
import { setAllApplicants } from '@/redux/applicationSlice';


const Applicants = () => {

    
  const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(state => state.application);

   useEffect(() => {

    const fetchApplicants = async () => {

        try {
           
            const response = await axios.get(`${REACT_APP_API_URI}/application/getApplicants/${params?.id}`, {withCredentials: true});
            console.log('data',response.data.success)
            if(response.data.success){
                dispatch(setAllApplicants(response.data.job));
            }
        } catch (error) {
            console.log(error.message);
            
        }
    }
    fetchApplicants();

   },[]);


  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
            {
                applicants?.applications?.length ? <ApplicantsTable/> : <spand>Applicants not found</spand>
            }
        </div>
    </div>
  )
}

export default Applicants;