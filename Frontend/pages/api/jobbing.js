import { db } from '../../config/firebaseConfig'; // Adjust the import path as needed
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const { keyword = '', department = '0' } = req.query;
    const keywordLower = keyword.toLowerCase(); // Convert keyword to lowercase

    // Create a reference to the "problems" collection
    const problemsRef = collection(db, "problems");

    // Create an array to hold the query conditions
    let conditions = [];

    if (keywordLower) {
      conditions.push(where("keywords", "array-contains", keywordLower));
    }
    
    if (department !== '0') {
      conditions.push(where("department", "==", department));
    }

    // Create the query with the conditions
    let q = query(problemsRef, ...conditions);

    // Fetch the documents
    const querySnapshot = await getDocs(q);

    // Map the documents to data
    const problems = querySnapshot.docs.map(doc => doc.data());

    // Send the response
    res.status(200).json(problems);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}


