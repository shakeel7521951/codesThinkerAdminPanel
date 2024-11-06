const Staff = require("../Schema/StaffSchema");
const cloudinary = require("../CloudinaryConfig/CloudinaryConfig");

const deleteStaffMember = async (req, res) => {
    try {
        const { _id } = req.params;

        const member = await Staff.findById(_id);
        if (!member) {
            return res.status(400).json({ message: "Member not found!" });
        }

        const imageUrl = member.staffMemberImage;

        const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];

        cloudinary.uploader.destroy(publicId, async (error, result) => {
            if (error) {
                return res.status(500).json({ message: "Error deleting image from Cloudinary", error });
            }

            try {
                const deleteMember = await Staff.findByIdAndDelete(_id);
                return res.status(200).json({ message: "Member and image deleted successfully", deleteMember });
            } catch (error) {
                return res.status(500).json({ message: "Error deleting member from database", error });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};

module.exports = deleteStaffMember;
