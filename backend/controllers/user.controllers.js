import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinery.js";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const file = req.file;

    let profilePhoto = "";

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponce = await cloudinary.uploader.upload(fileUri.content);
      profilePhoto = cloudResponce.secure_url;
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "user already exits",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhoto,
      },
    });

    res.status(201).json({
      message: "user created",
      success: true,
    });
  } catch (err) {
    console.log("oopps", err);
    return res.status(500).json({
      message: "server error",
      success: false,
      error: err?.message,
    });
  }
};

// login controller

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "opps missing something ",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "incorrect password",
        success: false,
      });
    }

    // check role is coorect or not

    if (role !== user.role) {
      return res.status(400).json({
        message: "account does not exit with current role ",
        success: false,
      });
    }

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `wellcome back ${user.fullname}`,
        success: true,
        user,
      });
  } catch (err) {
    console.log("oopps", err);
    return res.status(500).json({
      message: "server error",
      success: false,
      error: err?.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "lax",
      })
      .json({
        message: "user logout",
        success: true,
      });
  } catch (err) {
    console.log("opps", err);
    return res.status(500).json({
      message: "server error",
      success: false,
      error: err?.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    // cloudinary aayega idder

    let cloudResponse;

    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
        folder: "resumes",
        secure: true,
        use_filename: true,
      });
    }

    let skillsArray;

    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; //middleware auth

    let user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "user is not authenticated",
        success: false,
      });
    }
    // updateing data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (skills) user.profile.skills = skillsArray;
    if (bio) user.profile.bio = bio;

    // resume come later here...

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //save the url of the resume basically couldinery url
      user.profile.resumeOriginalName = file.originalname; //save the original name of the file or pdf
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "update succesfully",
      success: true,
      user,
    });
  } catch (err) {
    console.log("opps", err);
    return res.status(500).json({
      message: "server error",
      success: false,
    });
  }
};
