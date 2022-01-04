'use strict';
const express = require("express");
const app = express();
const apiRoutes = require('./app/routes/index');

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res) => {
  res.send("This is a sample express app")
})

// var testRoutes = require('./app/routes/index');

// Import my test routes into the path '/test'
app.use('/api', apiRoutes.routes);

// require("./app/routes/index.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});