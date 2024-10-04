const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Update with the path to your service account key

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<your-database-name>.firebaseio.com' // Replace with your database URL
});

const db = admin.firestore();

async function addEmptyStringsToKeywords(numberOfEmptyStrings) {
  try {
    const problemsRef = db.collection('problems');
    const snapshot = await problemsRef.get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    const batch = db.batch();

    snapshot.forEach(doc => {
      const docData = doc.data();
      let keywords = docData.keywords || [];

      // Add empty strings to the keywords array
      const emptyStringsToAdd = Array(numberOfEmptyStrings).fill('');
      keywords = [...keywords, ...emptyStringsToAdd];

      // Update the document if necessary
      batch.update(doc.ref, { keywords });
      console.log(`Prepared update for document ${doc.id}`);
    });

    await batch.commit();
    console.log('Batch update completed.');
  } catch (error) {
    console.error('Error adding empty strings:', error);
  }
}

// Call the function with the desired number of empty strings to add
addEmptyStringsToKeywords(3); // Adjust the number as needed
