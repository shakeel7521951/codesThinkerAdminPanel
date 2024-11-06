const express = require("express");
const addStaffMember = require("../StaffController/AddStaffMember");
const deleteStaffMember = require("../StaffController/DeleteMember");
const getStaffMembers = require("../StaffController/getStaffMembers");
const updateMemberData = require("../StaffController/updateMemberData");
const getMember = require("../StaffController/GetSingleMember");

const router = express.Router();

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../CloudinaryConfig/CloudinaryConfig"); 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'staffImages',
    allowed_formats: ['jpg', 'jpeg', 'png'], 
    public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`, 
  },
});

const staffImages = multer({ storage });

// Routes
router.get("/getMember/:id", getMember);
router.post("/addMember", staffImages.single('staffMemberImage'), addStaffMember);
router.delete("/deleteMember/:_id", deleteStaffMember);
router.get("/staff-members", getStaffMembers);
router.put("/update-profile/:id", staffImages.single('staffMemberImage'), updateMemberData);

module.exports = router;
