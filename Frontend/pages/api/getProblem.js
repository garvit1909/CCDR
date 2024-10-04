// import { db } from "../../config/firebaseConfig"; // Adjust the import path as needed
// import { doc, getDoc } from 'firebase/firestore';

// export default async function handler(req, res) {
//     const { id } = req.query; // Extract problem-id from query parameters

//     if (!id) {
//         return res.status(400).json({ error: 'Problem ID is required' });
//     }

//     try {
//         // Create a reference to the specific problem document
//         const problemRef = doc(db, "problems", id);
        
//         // Fetch the document
//         const docSnap = await getDoc(problemRef);

//         if (docSnap.exists()) {
//             // Send the document data as the response
//             res.status(200).json(docSnap.data());
//         } else {
//             // Handle case where the document does not exist
//             res.status(404).json({ error: 'Problem not found' });
//         }
//     } catch (error) {
//         console.error('Error fetching problem data:', error);
//         res.status(500).json({ error: 'Failed to fetch data' });
//     }
// }




import { db } from '../../config/firebaseConfig'; // Adjust the import path as needed
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Missing problem id' });
    }

    // Create a reference to the "problems" collection
    const problemsRef = collection(db, 'problems');
    
    // Query to find the document with the specific id
    const q = query(problemsRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    // Assuming the id is unique and there is only one document
    const problem = querySnapshot.docs[0].data();
    
    res.status(200).json(problem);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
