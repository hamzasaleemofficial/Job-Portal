
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



const useGetComapnyById = (companyId) => {

    const dispatch = useDispatch();
    
    useEffect(() =>{
        const fetchSingleCompany = async() => {

            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/getCompanyById/${companyId}`, {withCredentials: true});
                if(response.data.success){
                    dispatch(setSingleCompany(response.data.company));
                }
            } catch (error) {
                console.log(error);
            }
            
        }
        fetchSingleCompany();
    },[companyId, dispatch])
 
}

export default useGetComapnyById;