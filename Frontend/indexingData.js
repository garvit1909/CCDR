const admin = require('firebase-admin');
const serviceAccount = require('./problemsfetch/serviceAccountKey.json'); // Path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

function tokenize(text) {
  return (text || '').toLowerCase().split(/\s+/);
}

async function indexProblems() {
  const snapshot = await db.collection('problems').get();
  const batch = db.batch();

  snapshot.forEach(doc => {
    const data = doc.data();
    
    // Ensure that fields have default empty strings if undefined
    const title = data.title || '';
    const problem = data.problem || '';
    const tags = data.tags || '';

    // Tokenize relevant fields
    const keywords = [
      ...tokenize(title),
      ...tokenize(problem),
      ...tokenize(tags)
    ];

    // Update the document with the tokenized keywords
    batch.update(doc.ref, { keywords });
  });

  await batch.commit();
  console.log('Problems indexed successfully!');
}

indexProblems().catch(console.error);
