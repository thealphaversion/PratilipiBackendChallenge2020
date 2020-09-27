// package imports
const express = require("express");

// module imports
const api = require("./api");

const app = express();
app.use(express.json());

// declaring routes
app.use("/api/", api);

process.on("unhandledRejection", (ex) => {
    throw ex;
});

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
