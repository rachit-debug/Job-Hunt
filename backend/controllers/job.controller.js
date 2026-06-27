import { Job } from "../models/job.model.js";

// admin ke liye
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      jobType,
      experience,
      position,
      companyId,
      location,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !jobType ||
      !experience ||
      !position ||
      !companyId ||
      !location
    ) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      jobType,
      experienceLevel: Number(experience),
      position: Number(position),
      location,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "new job created",
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

// student ke liye
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query).populate({
      path : "company"
    }).sort({createdAt : -1})

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

// student ke liye
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path : "application"
    })

    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

// recruiter ke liye (admin ne kitne job create kiye)
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path : "company"
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
