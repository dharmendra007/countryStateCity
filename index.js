//import express for routing
const express = require("express");
const cors = require('cors');

//import body-parser
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

var jsonParser = bodyParser.json()
app.use(jsonParser);

// const ApiRoutes = require("./src/routes/index");
// app.use('/api', ApiRoutes);

// app.use((error, req, res, next) => {
//             logger.error(`${404} - ${`No route found`} - ${req.originalUrl} - ${req.method} - ${req.ip}`
//   );
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });

// app.use((req, res) => {
//     res.status(404).json({
//       message: `Route ${req.url} Not found.`
//     });
//   });

app.listen(5000, (req, res) => {
    console.log(`The server is running on port : 5000`);
});