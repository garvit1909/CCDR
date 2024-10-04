const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://prorep-37a3c.firebaseio.com'
});

const firestore = admin.firestore();

const deleteAllDocumentsInCollection = async (collectionPath) => {
  const collectionRef = firestore.collection(collectionPath);
  const querySnapshot = await collectionRef.get();

  const batch = firestore.batch();

  querySnapshot.forEach(doc => {
    batch.delete(doc.ref);
  });

  try {
    await batch.commit();
    console.log('All documents in collection deleted successfully');
  } catch (error) {
    console.error('Error deleting documents:', error);
  }
};

deleteAllDocumentsInCollection('problems');
