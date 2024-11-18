import { Router } from "express";
import { deleteAvatar, getCurrentUser, LoginUser, LogoutUser, Signup, updateAvatar, UpdateProfile } from "../Controllers/User.controller.js";
import { verifyJWT } from "../Middlewares/Auth.middleware.js";
import {upload} from '../Middlewares/multer.middleware.js'
const router=Router();
router.route("/signup").post(Signup)
router.route("/login").post(LoginUser)
router.route("/user-profile").get(verifyJWT,getCurrentUser)
router.route("/update-profile").patch(verifyJWT,UpdateProfile)
router.route("/update-avatar").patch(verifyJWT,upload.single("image"),updateAvatar)
router.route("/delete-avatar").delete(verifyJWT,upload.single("image"),deleteAvatar)
router.route("/logout").patch(verifyJWT,LogoutUser)
export default router;