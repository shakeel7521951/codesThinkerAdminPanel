const Staff = require("../Schema/StaffSchema");

const addStaffMember = async (req, res) => {
    try {
        const { name, skill } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image." });
        }

        const staffMemberImage = req.file.path; 

        const newStaff = new Staff({
            name,
            skill,
            staffMemberImage 
        });

        await newStaff.save();

        res.status(200).json({ message: "Staff member added successfully", newStaff });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = addStaffMember;
