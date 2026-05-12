import useGetAllJobs from "@/hooks/useGetAllJobs";
import CategoryCarousel from "./CategoryCarousel";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";


const Home = () => {
  useGetAllJobs();
  // useGetAppliedJobs();
 
 
  const {user} = useSelector(state => state.auth);
  const navigate = useNavigate();

  

  useEffect(() => {
    if(user && user.role === 'recruiter') {
      navigate("/admin/companies");
    }
  },[])
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
      
    </>
  );
};

export default Home;
