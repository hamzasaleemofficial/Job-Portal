import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        allCompanies: [],
        singleCompany: null,
        searchCompanyByText: "",

        
    },
    reducers: {
        //actions
        setAllCompanies: (state,action) => {
            state.allCompanies = action.payload;
        },
        setSingleCompany: (state,action) => {
            state.singleCompany = action.payload;
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        }
       
    }
});

export const {setAllCompanies ,setSingleCompany, setSearchCompanyByText} = companySlice.actions;
export default companySlice.reducer;