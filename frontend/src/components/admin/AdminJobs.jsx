import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import AdminJobsTable from "./AdminJobsTable";
import { setSearchJobByTitle } from "@/redux/jobSlice";

const AdminJobs = () => {

  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByTitle(input));
  },[input]);

  const handleNewCompany = () => {
    navigate("/admin/PostJob");
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
          placeholder="Filter by title"
          type = "text"
          onChange = {inputHandler}
          />
          <Button onClick={handleNewCompany}>Create Job Post</Button>
        </div>

        <AdminJobsTable/>
      </div>
    </div>
  );
};

export default AdminJobs;
