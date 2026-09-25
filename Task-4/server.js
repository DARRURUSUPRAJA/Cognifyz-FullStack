const express = require("express");

const app = express();
const PORT = 3003;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/profile", (req, res) => {
    res.render("profile");
});

app.listen(PORT, () => {
    console.log(`Task 4 server running at http://localhost:${PORT}`);
});