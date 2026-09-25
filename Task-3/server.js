const express = require("express");

const app = express();
const PORT = 3002;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home page
app.get("/", (req, res) => {
    res.render("index", {
        submitted: false,
        name: "",
        email: "",
        course: ""
    });
});

// Registration form
app.post("/register", (req, res) => {
    const { name, email, course } = req.body;

    res.render("index", {
        submitted: true,
        name,
        email,
        course
    });
});

app.listen(PORT, () => {
    console.log(`Task 3 server running at http://localhost:${PORT}`);
});