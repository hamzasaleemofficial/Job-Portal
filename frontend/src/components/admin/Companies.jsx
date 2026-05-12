import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/hooks/useGetAllComapnies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {

  useGetAllCompanies();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  },[input]);

  const handleNewCompany = () => {
    navigate("/admin/companies/create");
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input 
          className="w-fit"
          placeholder="Filter by name"
          type = "text"
          onChange = {inputHandler}
          />
          <Button onClick={handleNewCompany}>New Companies</Button>
        </div>

        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
