const Staff = require("../Schema/StaffSchema");
const cloudinary = require("../CloudinaryConfig/CloudinaryConfig");

const updateMemberData = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        const memberToUpdate = await Staff.findById(id);
        if (!memberToUpdate) {
            return res.status(400).json({ message: "Member not found!" });
        }

        if (req.file) {
            if (memberToUpdate.staffMemberImage) {
                const oldImageUrl = memberToUpdate.staffMemberImage;
                const oldPublicId = oldImageUrl.split('/').slice(-2).join('/'); 

                await cloudinary.uploader.destroy(oldPublicId);
            }

            updateData.staffMemberImage = req.file.path;  
        }

        const updatedMemberData = await Staff.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedMemberData) {
            return res.status(404).json({ message: "Member update failed, member not found." });
        }

        return res.status(200).json({ message: "Member profile updated", updatedMemberData });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = updateMemberData;
