const fs = require('fs');
const path = require('path');

// Path to your old problems file
const oldProblemsFilePath = path.join(__dirname, 'problems.json');

// Path to your new problems file
const newProblemsFilePath = path.join(__dirname, 'newProblems.json');

// Read and parse the new JSON file
let newProblems;
try {
  newProblems = JSON.parse(fs.readFileSync(newProblemsFilePath, 'utf8'));
} catch (err) {
  console.error('Error reading or parsing the new JSON file:', err);
  process.exit(1); // Exit the script if there's an error
}

// Replace the old problems.json with the new data
try {
  fs.writeFileSync(oldProblemsFilePath, JSON.stringify(newProblems, null, 2), 'utf8');
  console.log('Old data replaced with new data successfully.');
} catch (err) {
  console.error('Error writing to the old problems file:', err);
}
