const express = require("express");
const morgan = require("morgan");

require("dotenv").config();

// ===== Pretty printing for console ===========================================

global.colors = {
    RST: "\x1b[0m",
    RED: "\x1b[31m",
    GRN: "\x1b[32m",
    BLU: "\x1b[34m",
    YEL: "\x1b[33m",
    MAG: "\x1b[35m",
    CYN: "\x1b[36m",
};

// ===== Server configuration ==================================================

const app = express();
app.use(morgan("dev")); // Enable pretty printing for request debug view
app.use(express.json()); // Allow Express to parse JSON bodies

// Port the server will listen on
const port = 3001;

// Allow Express to parse JSON bodies
app.use(express.json());

// ===== Routes ================================================================

// Dynamically load all routes from sub-folders for ease of extensibility
require("./routes/DLR")(app);

app.listen(port, () => {
    console.log(
        `Server listening at ${global.colors.MAG}http://localhost:${port}${global.colors.RST}`
    );
});
