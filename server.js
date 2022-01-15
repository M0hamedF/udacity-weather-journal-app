projectData = {};
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use(express.static('website'));
const port = 8000;
const server = app.listen(port, listening);
function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

app.post("/postdata", (req, res) => {
    projectData = req.body;
    res.send(projectData);
});
app.get("/getData", (req, res) => {
    res.send(projectData);
});

