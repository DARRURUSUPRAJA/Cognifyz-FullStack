const express = require("express");

const app = express();
const PORT = 3001;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const feedbackData = [];

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {
    const {
        name,
        email,
        age,
        course,
        rating,
        feedback,
        agreement
    } = req.body;

    const errors = [];

    if (!name || name.trim().length < 3) {
        errors.push("Name must contain at least 3 characters.");
    }

    if (!email || !email.includes("@")) {
        errors.push("Please enter a valid email address.");
    }

    if (!age || Number(age) < 16 || Number(age) > 100) {
        errors.push("Age must be between 16 and 100.");
    }

    if (!course) {
        errors.push("Please select a course.");
    }

    if (!rating) {
        errors.push("Please select a rating.");
    }

    if (!feedback || feedback.trim().length < 10) {
        errors.push("Feedback must contain at least 10 characters.");
    }

    if (!agreement) {
        errors.push("You must agree before submitting.");
    }

    if (errors.length > 0) {
        return res.render("error", {
            errors
        });
    }

    const newFeedback = {
        id: feedbackData.length + 1,
        name: name.trim(),
        email: email.trim(),
        age: Number(age),
        course,
        rating: Number(rating),
        feedback: feedback.trim(),
        submittedAt: new Date().toLocaleString()
    };

    feedbackData.push(newFeedback);

    res.render("success", {
        data: newFeedback
    });
});

app.listen(PORT, () => {
    console.log(`Task 2 server running at http://localhost:${PORT}`);
});