import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinery.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        message: "this company is allready resitered",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "your company is resiterd now",
      success: true,
      company,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user id

    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "company fetched",
      success: true,
      companies,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

// get company by id

export const getCompanyById = async (req, res) => {
  try {
    const CompanyId = req.params.id;
    const company = await Company.findById(CompanyId);
    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "company founded",
      success: true,
      company,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    let updateData

    if(file){
      const fileUri = getDataUri(file)
      const cloudResponce = await cloudinary.uploader.upload(fileUri?.content)
      const logo = cloudResponce.secure_url
       updateData = { name, description, website, location ,logo };

    }else{

       updateData = { name, description, website, location };
    }


    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: " company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: " company details updated",
      success: true,
      company
    });
  } catch (err) {
    console.log(err);
  }
};
