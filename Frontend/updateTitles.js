const admin = require('firebase-admin');
const serviceAccount = require('./problemsfetch/serviceAccountKey.json'); // Adjust the path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://prorep-37a3c.firebaseio.com' // Replace with your actual database URL
});

const db = admin.firestore();

async function addInterestedArrayToUsers() {
  const snapshot = await db.collection('users').get(); // Replace 'users' with your actual collection name
  const batch = db.batch();

  snapshot.forEach(doc => {
    const data = doc.data();
    if (!data.interested) {  // Check if the 'interested' field already exists
      // Add a new field with an empty array to each user document if it doesn't exist
      batch.update(doc.ref, { interested: [] });
    }
  });

  await batch.commit();
  console.log('Empty interested array added successfully to all users!');
}

addInterestedArrayToUsers().catch(console.error);

