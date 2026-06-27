import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

// basically it's a card

function Job({ job }) {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffrance = currentTime - createdAt;
    return Math.floor(timeDiffrance / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="w-full p-4 sm:p-5 rounded-xl shadow-xl bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">
          {job?.createdAt
            ? `${daysAgoFunction(job.createdAt)} Days ago`
            : "Today"}
        </p>

        <Button
          variant="outline"
          className="rounded-full shrink-0"
          size="icon"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-3">
        <Button
          className="p-5 shrink-0"
          variant="outline"
          size="icon"
        >
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>

        <div className="min-w-0">
          <h1 className="font-medium text-base sm:text-lg truncate">
            {job?.company?.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg sm:text-xl my-2 line-clamp-2">
          {job?.title}
        </h1>

        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.positions} Positions
        </Badge>

        <Badge className="text-[#f83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>

        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>

        <Button className="bg-[#7209b7] hover:bg-[#5f08a0] w-full sm:w-auto">
          Save for Later
        </Button>
      </div>
    </div>
  );
}

export default Job;
