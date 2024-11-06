const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true
    },
    staffMemberImage: {
        type: String,  
        required: true
    }
});

const Staff = mongoose.model('StaffMember', staffSchema);
module.exports = Staff;
