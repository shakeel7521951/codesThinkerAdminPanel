const Staff = require("../Schema/StaffSchema");

const getStaffMembers = async(req,res)=>{
    try {
        const members = await Staff.find();
    if(members){
        res.status(200).json({message:"Members data received successfully",members})
    }else{
        res.status(400).json({message:"Members not found"})
    }
    } catch (error) {
     res.status(500).json({message:`Internal server error ${error.message}`})   
    }
}

module.exports = getStaffMembers;