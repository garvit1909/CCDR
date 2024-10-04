const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Path to your service account key
const serviceAccount = require('./serviceAccountKey.json');

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://prorep-37a3c.firebaseio.com'
});

const firestore = admin.firestore();

// Correct path to the JSON file
const problemsFilePath = path.join(__dirname, 'problems.json');

// Read and parse the JSON file
let problems;
try {
  problems = JSON.parse(fs.readFileSync(problemsFilePath, 'utf8'));
} catch (err) {
  console.error('Error reading or parsing the JSON file:', err);
  process.exit(1); // Exit the script if there's an error
}

const uploadProblems = async () => {
  const batch = firestore.batch();

  problems.forEach(problem => {
    const docRef = firestore.collection('problems').doc(); // Automatically generate an ID
    batch.set(docRef, problem);
  });

  try {
    await batch.commit();
    console.log('Problems uploaded successfully');
  } catch (err) {
    console.error('Error uploading problems:', err);
  }
};

uploadProblems();


