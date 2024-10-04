import { db } from '../../config/firebaseConfig'; // Adjust the import to your Firestore config
import { arrayUnion, arrayRemove, query, where, getDocs, updateDoc, collection } from 'firebase/firestore'; // Import necessary Firestore functions

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id, userId, newInterested } = req.body;

    console.log('Received data:', { id, userId, newInterested });

    // Validate inputs
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Problem ID is required and must be a string' });
    }
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'User ID is required and must be a string' });
    }
    if (typeof newInterested !== 'boolean') {
        return res.status(400).json({ error: 'newInterested must be a boolean' });
    }

    try {
        // Query to find the document where the id field matches
        const q = query(collection(db, 'problems'), where('id', '==', id));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log('Problem not found:', id);
            return res.status(404).json({ error: 'Problem not found' });
        }

        const problemDoc = querySnapshot.docs[0]; // Get the first document matching the query
        const problemRef = problemDoc.ref;

        if (newInterested) {
            // Add userId to the array if it doesn't exist
            await updateDoc(problemRef, {
                newArrayField: arrayUnion(userId),
            });
            console.log('User added:', userId);
        } else {
            // Remove userId from the array
            await updateDoc(problemRef, {
                newArrayField: arrayRemove(userId),
            });
            console.log('User removed:', userId);
        }

        // Fetch the updated document to return the latest data
        const updatedProblem = (await getDocs(q)).docs[0].data();
        console.log('Updated problem successfully:', updatedProblem);

        return res.status(200).json({ updatedProblem });
    } catch (error) {
        console.error('Error updating problem:', error);  // Logging entire error object
        return res.status(500).json({ error: 'Failed to update problem', details: error.message });
    }
}
