import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCancel = () => {
    navigate("/admin/companies");
  };

  const registerNewCompany = async () => {
    try {
      const response = await axios.post(
        `${COMPANY_API_END_POINT}/registerCompany`,
        { companyName },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true
        });
      console.log(response.data.company);
      if (response?.data?.success) {
        dispatch(setSingleCompany(response.data.company));
        const companyId = response?.data?.company?._id;
        navigate(`/admin/companies/companysetup/${companyId}`);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.success(error.response.data.message);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p> Would you like to give your company name? or change it later.</p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Google eta..."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-4 my-10">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
