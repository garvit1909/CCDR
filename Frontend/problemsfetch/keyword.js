const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com'
});

const db = admin.firestore();

async function updateKeywords() {
  const snapshot = await db.collection('problems').get();

  snapshot.forEach(async (doc) => {
    const data = doc.data();

    // Combine fields to generate keywords
    let combinedText = `${data.domain || ''} ${data.statement || ''} ${data.tags || ''}`;
    
    // Convert text to lowercase and split into keywords
    let keywords = combinedText.toLowerCase().split(/\s+/);

    // Remove duplicates
    keywords = [...new Set(keywords)];

    // Update the document with the keywords array
    await db.collection('problems').doc(doc.id).update({
      keywords: keywords
    });

    console.log(`Updated document ${doc.id} with keywords:`, keywords);
  });
}

updateKeywords().then(() => {
  console.log('All documents updated with keywords');
}).catch(error => {
  console.error('Error updating documents:', error);
});
