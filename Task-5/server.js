const express = require("express");

const app = express();
const PORT = 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let students = [
    {
        id: 1,
        name: "Aadhi",
        course: "Software Engineering",
        email: "aadhi@example.com"
    },
    {
        id: 2,
        name: "Rahul",
        course: "Computer Science",
        email: "rahul@example.com"
    }
];

// GET - Display all students
app.get("/api/students", (req, res) => {
    res.json(students);
});

// GET - Display one student
app.get("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// POST - Add a new student
app.post("/api/students", (req, res) => {
    const { name, course, email } = req.body;

    if (!name || !course || !email) {
        return res.status(400).json({
            message: "Name, course and email are required"
        });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        course,
        email
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT - Update a student
app.put("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, course, email } = req.body;

    student.name = name || student.name;
    student.course = course || student.course;
    student.email = email || student.email;

    res.json({
        message: "Student updated successfully",
        student
    });
});

// DELETE - Delete a student
app.delete("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const studentExists = students.some(student => student.id === id);

    if (!studentExists) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students = students.filter(student => student.id !== id);

    res.json({
        message: "Student deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Task 5 server running at http://localhost:${PORT}`);
});