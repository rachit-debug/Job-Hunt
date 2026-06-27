import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "job id is required",
        success: false,
      });
    }

    // check user is already applyed in that job or not

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "allready applyed",
        success: false,
      });
    }

    //  check if the job exits

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }

    // create a new application

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.application.push(newApplication._id);

    await job.save();

    // return updated job so FE can immediately recompute disabled state
    const updatedJob = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      model: "Application",
    });

    return res.status(201).json({
      message: "applied successfully",
      success: true,
      job: updatedJob,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application || application.length === 0) {
      return res.status(404).json({
        message: "no applications",
        success: false,
      });
    }

    return res.status(200).json({
      message: "here is your all applications",
      application,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
// admin dhekega kitne uuser ne apply kiya hai

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "here is your all applications",
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: " status is require",
        success: false,
      });
    }

    // find application by application id

    const application = await Application.findOne({ _id: applicationId });

    if (!application) {
      return res.status(400).json({
        message: " application not found",
        success: false,
      });
    }

    // update the status

    application.status = status.toLowerCase();

    await application.save();

    return res.status(200).json({
      message: "status updated",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
