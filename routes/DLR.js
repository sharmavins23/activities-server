const fs = require("fs");

// On server start, read all route files and dynamically load them
function dynamicallyLoadRoutes(app) {
    // Read all folder names in the current directory
    let folderNames = fs.readdirSync(__dirname);

    // Iterate through all foldernames
    folderNames.forEach((folderName) => {
        // Skip the current file
        if (folderName === "DLR.js") {
            return;
        }
        // Skip anything that's not a folder - Ending in .xxx
        if (!fs.lstatSync(__dirname + "/" + folderName).isDirectory()) {
            console.log("Skipping", folderName);
            return;
        }

        // Get all filenames
        let filenames = fs.readdirSync(__dirname + "/" + folderName);

        filenames.forEach((filename) => {
            // Skip non-JS files
            if (filename.substr(filename.lastIndexOf(".") + 1) !== "js") {
                return;
            }

            let jsModule = filename.substr(0, filename.indexOf("."));
            require("./" + folderName + "/" + jsModule)(app);
            console.log(
                `Route loaded: ${global.colors.GRN}${folderName}${global.colors.RST}/${global.colors.YEL}${jsModule}${global.colors.RST}`
            );
        });
    });
}

module.exports = dynamicallyLoadRoutes;
