const mongoose = require("mongoose");
const MONGOURI = "mongodb://localhost:27017/Code'sThinker"

mongoose.connect(MONGOURI)
.then(()=>{
    console.log("Database connected")
})
.catch((error)=>{
    console.log(`Database not conected ${error}`)
})
module.exports = mongoose;