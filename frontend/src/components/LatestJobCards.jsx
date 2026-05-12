
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const LatestJobCards = ({ item }) => {

  const navigate = useNavigate();

  return (
    <div   onClick={() => navigate(`/description/${item?._id}`)} className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
       <div className="flex items-center gap-2 mb-2">
       <Avatar>
          <AvatarImage src={item?.company?.logo} />
        </Avatar>
        <h1 className="font-medium text-lg">{item?.company?.name}</h1>
       </div>
       <p className="text-sm text-gray-500">{item?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{item?.title}</h1>
        <p className="text-sm text-gray-600">{item?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {item?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {item?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {item?.salary} $
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
