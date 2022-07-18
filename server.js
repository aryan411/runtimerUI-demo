const express = require("express");

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/Client"));

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname + "/dist/Client/index.html"))
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
