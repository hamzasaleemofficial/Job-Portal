import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const {loading} = useSelector(state => state.auth);
  // console.log(loading);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    //console.log(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message);
    } 
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto mt-10">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 py-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup
              defaultValue="student"
              className=" flex items-center gap-4 my-5"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role == "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role == "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          { loading ?
            
            <Button className=" w-full my-4">
              <Loader2 className="mr-2 h-4 w-4" />
              Please wait
            </Button>
            :
            <Button type="submit" className=" w-full my-4">
              Login
            </Button>
            
           
          }

          <span className="text-sm">
            Dont have an account ?
            <Link to="/signup" className="text-blue-600">
              {" "}
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
