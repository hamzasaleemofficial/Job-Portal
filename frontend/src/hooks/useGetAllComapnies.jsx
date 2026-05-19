
import { setAllCompanies } from "@/redux/companySlice";
import { REACT_APP_API_URI } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetAllCompanies = () => {

    const dispatch = useDispatch();

    useEffect(() =>{
        const fetchAllCompanies = async() => {

            try {
                const response = await axios.get(`${REACT_APP_API_URI}/company/getCompany`, {withCredentials: true});
                if(response.data.success){
                    dispatch(setAllCompanies(response.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
            
        }
        fetchAllCompanies();
    },[])
 
}

export default useGetAllCompanies;