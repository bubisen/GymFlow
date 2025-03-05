const express = require('express');
const app = express();
const PORT = process.env.PORT || 3200;
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

let workouts = [];
let nutrition = [];

// Get all workouts
app.get('/api/workouts', (req, res) => {
    res.json(workouts);
});

// Add a new workout
app.post('/api/workouts', (req, res) => {
    const { date, exercise, weight, reps, sets } = req.body;
    workouts.push({ date, exercise, weight, reps, sets });
    res.json({ message: 'Workout added successfully' });
});

// Get all nutrition entries
app.get('/api/nutrition', (req, res) => {
    res.json(nutrition);
});

// Add a new nutrition entry
app.post('/api/nutrition', (req, res) => {
    const { mealDate, meal, calories, proteins, carbs, fats } = req.body;
    nutrition.push({ mealDate, meal, calories, proteins, carbs, fats });
    res.json({ message: 'Nutrition entry added successfully' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'naplo.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`http://localhost:${PORT}`);

  ngrok.connect(PORT).then(url => {
    console.log(`Url: ${url}`);
  }).catch(err=> {
    console.error(err);
  })
});