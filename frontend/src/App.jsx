import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import PostJob from "./components/admin/PostJob";
import AdminJobs from "./components/admin/AdminJobs";
import Applicants from "./components/admin/Applicants";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";




const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },


  // ADMIN ROUTES

  {
    path:"/admin/companies",
    element: <ProtectedRoutes> <Companies/></ProtectedRoutes>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoutes><CompanyCreate/></ProtectedRoutes>
  },
  {
    path:"/admin/companies/companysetup/:id",
    element: <ProtectedRoutes><CompanySetup/></ProtectedRoutes>
  },
  {
    path: "/admin/AdminJobs",
    element: <ProtectedRoutes><AdminJobs/></ProtectedRoutes>
  },
  {
    path:"/admin/PostJob",
    element: <ProtectedRoutes><PostJob/></ProtectedRoutes>
  },
  {
    path:"/admin/jobs/:id",
    element: <ProtectedRoutes><Applicants/></ProtectedRoutes>
  }

]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
