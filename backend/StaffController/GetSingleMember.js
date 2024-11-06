const Staff = require('../Schema/StaffSchema');

const getMember = async (req, res) => {
    try {
        const {id } = req.params;
        const member = await Staff.findById(id);
        if (member) {
            res.status(200).json({ message: "Member data received successfully", member });
        } else {
            res.status(404).json({ message: "Member not found" });
        }
    } catch (error) {
        res.status(500).json({message:`Internal server error ${error.message}`})
    }
}

module.exports = getMember;