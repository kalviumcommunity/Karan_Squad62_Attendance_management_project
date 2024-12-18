const express = require('express');
const fs = require('fs');
const path = require('path');
const { resolve } = path;

const app = express();
app.use(express.json());

const studentData = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (threshold === undefined || typeof threshold !== 'number' || threshold < 0) {
    return res.status(400).json({
      error: "'threshold' must be a non-negative number and is required"
    });
  }

  const filteredStudents = studentData
    .filter((student) => student.total > threshold)
    .map((student) => ({
      name: student.name,
      total: student.total,
    }));

  res.json({
    count: filteredStudents.length,
    students: filteredStudents,
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});