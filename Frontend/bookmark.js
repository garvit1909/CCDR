const admin = require('firebase-admin');
const serviceAccount = require('./problemsfetch/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

async function addBookmarkedFieldToAllUsers() {
  const usersRef = firestore.collection('users');
  const snapshot = await usersRef.get();

  const updatePromises = [];
  
  snapshot.forEach((userDoc) => {
    const userRef = usersRef.doc(userDoc.id);
    const userData = userDoc.data();

    // Check if the 'bookmarked' field already exists
    if (!userData.bookmarked) {
      const updatePromise = userRef.update({
        bookmarked: []  // Initialize with an empty array
      })
      .then(() => {
        console.log(`Added 'bookmarked' field to user: ${userDoc.id}`);
      })
      .catch((error) => {
        console.error(`Error updating user ${userDoc.id}:`, error);
      });

      updatePromises.push(updatePromise);
    }
  });

  // Wait for all update promises to complete
  await Promise.all(updatePromises);
}

addBookmarkedFieldToAllUsers()
  .then(() => {
    console.log('All user documents updated with bookmarked field.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error updating documents:', error);
    process.exit(1);
  });


  
