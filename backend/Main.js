const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path"); 
require('dotenv').config();


require("./Conn/Connection");
const routes = require('./Api_routes/routes');
const staffRoutes = require('./Api_routes/staff_routes');

const port = process.env.PORT || 6005;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/staffImages',express.static(path.join(__dirname,'staffImages')))

app.use('/', routes);
app.use('/staff',staffRoutes);

app.listen(port, () => {
    console.log(`Running at port no. ${port}`);
});
