import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {

  const navigate = useNavigate();
  const jobId = 'djoewjoiewjij';

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/shutterstock/photos/2174926871/display_1500/stock-vector-circle-line-simple-design-logo-blue-format-jpg-png-eps-2174926871.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Compnay Name</h1>
          <p className="text-sm text-gray-500">Germany</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
          obcaecati, iste unde deserunt doloribus suscipit tempore sint
          repudiandae quaerat consequuntur.
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant="ghost">12 Positions</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">Full Time</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">1.3 CR</Badge>
      </div>
      <div className="flex items-center gap-4 mt-5">
        <Button onClick={() => navigate(`/description/${jobId}`)} variant="outline">Details</Button>
        <Button className="bg-[#6A38C2]">Save for later</Button>
      </div>
    </div>
  );
};

export default Job;
