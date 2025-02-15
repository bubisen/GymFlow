let workouts = [];
let nutrition = [];

// Function to calculate total weight lifted
function calculateTotalWeightLifted() {
    let totalWeight = 0;
    workouts.forEach(workout => {
        totalWeight += workout.weight * workout.reps * workout.sets;
    });
    return totalWeight;
}

// Function to update the achievements and dashboard
function updateDashboard() {
    const totalWorkouts = workouts.length;
    const totalCalories = workouts.reduce((total, workout) => total + (workout.weight * workout.reps * workout.sets * 0.1), 0); // Assuming 0.1 calories per kg lifted
    const totalSetsLifted = workouts.reduce((total, workout) => total + workout.sets, 0);
    const totalRepsLifted = workouts.reduce((total, workout) => total + (workout.reps * workout.sets), 0); // Summing reps and sets
    const totalWeightLifted = calculateTotalWeightLifted();

    // Update the Dashboard
    document.getElementById('totalWorkouts').textContent = totalWorkouts;
    document.getElementById('totalCalories').textContent = totalCalories.toFixed(2);
    document.getElementById('achievementSetsLifted').textContent = `${totalSetsLifted}`
    document.getElementById('achievementRepsLifted').textContent = `${totalRepsLifted}`;
    document.getElementById('achievementWeightsLifted').textContent = `${totalWeightLifted.toFixed(2)} kg`;

    // Update the Workouts Table
    const workoutsTable = document.getElementById('workoutsTable').getElementsByTagName('tbody')[0];
    workoutsTable.innerHTML = ''; // Clear current rows
    workouts.forEach(workout => {
        const row = workoutsTable.insertRow();
        row.insertCell(0).textContent = workout.date;
        row.insertCell(1).textContent = workout.exercise;
        row.insertCell(2).textContent = workout.weight;
        row.insertCell(3).textContent = workout.reps;
        row.insertCell(4).textContent = workout.sets;
    });

    // Update the Nutrition Table
    const nutritionTable = document.getElementById('nutritionTable').getElementsByTagName('tbody')[0];
    nutritionTable.innerHTML = ''; // Clear current rows
    nutrition.forEach(item => {
        const row = nutritionTable.insertRow();
        row.insertCell(0).textContent = item.mealDate;
        row.insertCell(1).textContent = item.meal;
        row.insertCell(2).textContent = item.calories;
        row.insertCell(3).textContent = item.proteins;
        row.insertCell(4).textContent = item.carbs;
        row.insertCell(5).textContent = item.fats;
    });
}

// Save workouts to localStorage
function saveWorkoutsToLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(workouts));
}

// Load workouts from localStorage
function loadWorkoutsFromLocalStorage() {
    const savedWorkouts = localStorage.getItem('workouts');
    if (savedWorkouts) {
        workouts = JSON.parse(savedWorkouts);
    }
}

// Save nutrition to localStorage
function saveNutritionToLocalStorage() {
    localStorage.setItem('nutrition', JSON.stringify(nutrition));
}

// Load nutrition from localStorage
function loadNutritionFromLocalStorage() {
    const savedNutrition = localStorage.getItem('nutrition');
    if (savedNutrition) {
        nutrition = JSON.parse(savedNutrition);
    }
}

// Add Workout Handler
document.getElementById('saveWorkout').addEventListener('click', () => {
    const date = document.getElementById('date').value;
    const exercise = document.getElementById('exercise').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const reps = parseInt(document.getElementById('reps').value);
    const sets = parseInt(document.getElementById('sets').value);

    workouts.push({ date, exercise, weight, reps, sets });
    saveWorkoutsToLocalStorage(); // Save to localStorage
    updateDashboard(); // Update the dashboard with new data

    document.getElementById('date').value = '';
    document.getElementById('exercise').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('reps').value = '';
    document.getElementById('sets').value = '';

    // Close Modal
    const workoutModal = bootstrap.Modal.getInstance(document.getElementById('addWorkoutModal'));
    workoutModal.hide();
});

// Add Nutrition Handler
document.getElementById('saveMeal').addEventListener('click', () => {
    const mealDate = document.getElementById('mealDate').value;
    const meal = document.getElementById('meal').value;
    const calories = parseInt(document.getElementById('calories').value);
    const proteins = parseInt(document.getElementById('proteins').value);
    const carbs = parseInt(document.getElementById('carbs').value);
    const fats = parseInt(document.getElementById('fats').value);

    nutrition.push({ mealDate, meal, calories, proteins, carbs, fats });
    saveNutritionToLocalStorage(); // Save to localStorage

    const nutritionTable = document.getElementById('nutritionTable').getElementsByTagName('tbody')[0];
    nutritionTable.innerHTML = ''; // Clear current rows
    nutrition.forEach(item => {
        const row = nutritionTable.insertRow();
        row.insertCell(0).textContent = item.mealDate;
        row.insertCell(1).textContent = item.meal;
        row.insertCell(2).textContent = item.calories;
        row.insertCell(3).textContent = item.proteins;
        row.insertCell(4).textContent = item.carbs;
        row.insertCell(5).textContent = item.fats;
    });

    document.getElementById('mealDate').value = '';
    document.getElementById('meal').value = '';
    document.getElementById('calories').value = '';
    document.getElementById('proteins').value = '';
    document.getElementById('carbs').value = '';
    document.getElementById('fats').value = '';

    // Close Modal
    const nutritionModal = bootstrap.Modal.getInstance(document.getElementById('addNutritionModal'));
    nutritionModal.hide();
});

document.getElementById('registerButton').addEventListener('click', function() {
    // Here you can add logic to handle registration, if necessary
    // Jelszó >= 8 karakter
    // email-nek legyen @ stb
});

document.getElementById('signInButton').addEventListener('click', function() {
    // Here you can add logic to handle sign-in, if necessary
    // megnézi hogy egyezik e az adatbázisban lévő adattal és utána betölti a fiók adatait
    // hiba kód ha nincs ilyen fiók
});

// Adatok megjelenítése a Weboldal betöltésekor
window.onload = function() {
    loadWorkoutsFromLocalStorage();
    loadNutritionFromLocalStorage();
    updateDashboard();
};