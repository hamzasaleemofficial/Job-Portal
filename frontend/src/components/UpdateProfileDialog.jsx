/* eslint-disable react/prop-types */
import {  Loader2 } from "lucide-react";
import { Button } from "./ui/button"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/Input";
import { Label } from "./ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.map((skill) => skill),
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${USER_API_END_POINT}/profileUpdate`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message);
    } finally{
      setLoading(false);
    }
    setOpen(false);
   
    console.log(input);
    console.log(loading);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>

          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullname" className="text-right">
                  Name
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  className="col-span-3"
                  onChange={changeEventHandler}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  disabled
                  id="email"
                  type="email"
                  name="email"
                  value={input.email}
                  className="col-span-3"
                  onChange={changeEventHandler}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  className="col-span-3"
                  onChange={changeEventHandler}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  type="text"
                  name="bio"
                  value={input.bio}
                  className="col-span-3"
                  onChange={changeEventHandler}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  type="text"
                  name="skills"
                  value={input.skills}
                  className="col-span-3"
                  onChange={changeEventHandler}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  type="file"
                  accept="application/pdf"
                  name="file"
                  className="col-span-3"
                  onChange={changeFileHandler}
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className=" w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className=" w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
