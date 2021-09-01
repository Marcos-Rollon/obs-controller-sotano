const express = require("express");
const port = 8000;
let app = express();

let server = app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

app.use(express.static("public"));
