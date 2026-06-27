import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

function LatestJobCards({ job }) {
  const navigate = useNavigate()
  return (
    <div onClick={()=>{navigate(`/description/${job._id}`)}} className="p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer w-full">
      <div>
        <h1 className="font-medium text-base sm:text-lg">
          {job?.company?.name}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">India</p>
      </div>

      <div className="mt-2">
        <h1 className="font-bold text-lg sm:text-xl my-2 break-words">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          className="text-blue-700 font-bold text-xs sm:text-sm"
          variant="ghost"
        >
          {job?.position}
        </Badge>

        <Badge
          className="text-[#f83002] font-bold text-xs sm:text-sm"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>

        <Badge
          className="text-[#7209b7] font-bold text-xs sm:text-sm"
          variant="ghost"
        >
          {job?.salary}LPA
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
