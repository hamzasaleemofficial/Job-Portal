import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {user} = useSelector(state => state.auth);
  
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-red-700"> Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/jobs'}>Jobs</Link></li>
            <li><Link to={'/browse'}>Browse</Link></li>
          </ul>
          {
            user ? 
            (
              <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div>
                <div className="flex gap-2 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      Software Developer
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600 ">
                  <div className="flex items-center my-2 gap-2 w-fit cursor-pointer">
                    <User2 />
                    <Button variant="link"> <Link to={'/profile'}>View Profile</Link></Button>
                  </div>
                  <div className="flex items-center gap-2 w-fit cursor-pointer">
                    <LogOut />
                    <Button variant="link">Logout</Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
            )
            :
            (
              <div className="flex gap-2">
                <Link to={'/login'}><Button variant="outline">Login</Button></Link>
                <Link to={'/signup'}><Button className="bg-[#6A38C2] hover:bg-[#5d31a9]">Signup</Button></Link>
              </div>
            ) 
          }
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
