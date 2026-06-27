import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import ApplyiedJobsTable from "./ApplyiedJobsTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAllAppliedJob";

// const skills = ["html", "Css", "Java Script", "ReactJs"];
const isResume = true;

function Profile() {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-8">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="profile image"
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>

              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className=" flex items-center gap-3 my-2">
            <Mail></Mail>
            <span>{user?.email}</span>
          </div>
          <div className=" flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5 ">
          <h1>Skills</h1>
          <div className="flex items-center gap-1 mt-2">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills?.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className=" grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md  font-bold">Resume</Label>
          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>Na</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>

        <ApplyiedJobsTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
