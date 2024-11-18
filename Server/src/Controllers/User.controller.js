import { User } from "../Models/User.Model.js";
import { asyncHandler } from "../Utilities/AsyncHandler.js";
import { ApiError } from "../Utilities/APIError.js";
import { ApiResponse } from "../Utilities/APIResponse.js";
import { UploadFile } from "../Utilities/FileUploader.js";
const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false }); // save in database
    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating Refresh Token!"
    );
  }
};

const Signup = asyncHandler(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if ([email, username, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required!");
    }
    const Existuser = await User.findOne({ email });
    if (Existuser) {
      throw new ApiError(409, "username or email already exists!");
    }
    const user = await User.create({
      email,
      password,
      username,
    });
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    const checkUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!checkUser) {
      throw new ApiError(500, " User is not regiseterd!");
    }
    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(201, checkUser, "User registered successfully"));
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(500, "Something went wrong")
    );
  }
});
const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json(400, " email is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .send({ status: 404, message: "Email does not exist!" });
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  // optional db call
  const LoggedIn = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: LoggedIn,
          accessToken,
          refreshToken,
        },
        "User Logged In successfully!"
      )
    );
});
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details fetched successfully!"));
});
const UpdateProfile = asyncHandler(async (req, res, next) => {
  try {
    const { firstname, lastname } = req.body;
    if (!firstname || !lastname) {
      throw new ApiError(400, "All field are required!");
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          firstname,
          lastname,
          isUser: true,
        },
      },
      { new: true }
    ).select("-password -refreshToken");
    return res
      .status(200)
      .json(new ApiResponse(200, user, "Profile updated successfully!"));
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(500, "Something went wrong while updating profile")
    );
  }
});
const updateAvatar = asyncHandler(async (req, res) => {
  const image = req.file?.path;
  if (!image) {
    throw new ApiError(400, "Profile file is missing!");
  }

  const avatar = await UploadFile(image);
  if (!avatar.url) {
    throw new ApiError(400, "Failed uploadig Avatar");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        image: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile image updated successfully"));
});
const deleteAvatar = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        image: null,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile image removed successfully"));
});
const LogoutUser = asyncHandler(async (req, res) => {
  const user=await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken:"",
      },
    },
    {
      new: true,
    }
  );
  return res.status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options)
    .json(new ApiResponse(200, null, "User logged Out successfully"));
   
});
export {
  Signup,
  LoginUser,
  getCurrentUser,
  UpdateProfile,
  updateAvatar,
  deleteAvatar,
  LogoutUser,
};
