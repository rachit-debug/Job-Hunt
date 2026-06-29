import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import { setSingleJob } from "../redux/jobSlice";

import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant";

import { toast } from "sonner";

function JobDescription() {
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  // realtime button state
  const [isApplied, setIsApplied] = useState(false);

  // apply job handler

  const applyJobHandler = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        // button instantly disable
        setIsApplied(true);

        // realtime redux update
        const updatedSingleJob = {
          ...singleJob,
          application: [
            ...(singleJob?.application || []),
            {
              applicant: user?._id,
            },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message);
    }
  };

  // fetch single job

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          // sync button state
          const applied = res.data.job?.application?.some(
            (application) => application?.applicant === user?._id,
          );

          setIsApplied(applied);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (jobId) {
      fetchSingleJob();
    }
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* top section */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="font-bold text-3xl text-gray-900">
            {singleJob?.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <Badge
              className="text-blue-700 font-semibold px-4 py-1"
              variant="ghost"
            >
              {singleJob?.position} Positions
            </Badge>

            <Badge
              className="text-red-600 font-semibold px-4 py-1"
              variant="ghost"
            >
              {singleJob?.jobType}
            </Badge>

            <Badge
              className="text-purple-700 font-semibold px-4 py-1"
              variant="ghost"
            >
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          disabled={isApplied}
          onClick={isApplied ? null : applyJobHandler}
          className={`rounded-lg px-6 py-5 text-white font-semibold ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5b30a6]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* heading */}

      <div className="mt-10 border-b border-gray-300 pb-3">
        <h1 className="text-xl font-bold text-gray-800">Job Description</h1>
      </div>

      {/* details */}

      <div className="mt-8 space-y-5">
        <div className="flex gap-3">
          <span className="font-bold min-w-[180px]">Role:</span>

          <span className="text-gray-700">{singleJob?.title}</span>
        </div>

        <div className="flex gap-3">
          <span className="font-bold min-w-[180px]">Location:</span>

          <span className="text-gray-700">{singleJob?.location}</span>
        </div>

        <div className="flex gap-3">
          <span className="font-bold min-w-[180px]">Description:</span>

          <span className="text-gray-700">{singleJob?.description}</span>
        </div>

        <div className="flex gap-3">
          <span className="font-bold min-w-[180px]">Experience:</span>

          <span className="text-gray-700">{singleJob?.experienceLevel}</span>
        </div>

        <div className="flex gap-3">
          <span className="font-bold min-w-[180px]">Salary:</span>

          <span className="text-gray-700">{singleJob?.salary} LPA</span>
        </div>

        <div className="flex gap-3">
          <span className="font-bold min-w-[180px]">Total Applicants:</span>

          <span className="text-gray-700">
            {singleJob?.application?.length || 0}
          </span>
        </div>

        <div className="flex gap-3">
          <span className="font-bold min-w-[180px]">Posted Date:</span>

          <span className="text-gray-700">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
