import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faBookmark as faBookmarkOutline } from '@fortawesome/free-solid-svg-icons';
import { getFirestore, doc, updateDoc, arrayRemove, arrayUnion, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const BookmarkButton = ({ problemId, onRemove }) => {
  const [isBookmarked, setIsBookmarked] = useState(true); // Start with true as the default value
  const [isUpdating, setIsUpdating] = useState(false);
  const firestore = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchBookmarkedStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(firestore, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          // Correctly set initial bookmark status
          setIsBookmarked((userData.bookmarked || []).includes(problemId));
        }
      }
    };

    fetchBookmarkedStatus();
  }, [problemId, auth.currentUser, firestore]);

  const toggleBookmark = async () => {
    if (isUpdating) return; // Prevent multiple rapid clicks

    const user = auth.currentUser;
    if (user) {
      setIsUpdating(true);
      const userRef = doc(firestore, 'users', user.uid);

      if (isBookmarked) {
        // Remove the problemId from the bookmarked array
        await updateDoc(userRef, {
          bookmarked: arrayRemove(problemId)
        });
        setIsBookmarked(false);
        if (onRemove) {
          onRemove(problemId);
        }
      } else {
        // Add the problemId to the bookmarked array
        await updateDoc(userRef, {
          bookmarked: arrayUnion(problemId)
        });
        setIsBookmarked(true);
      }
      setIsUpdating(false);
    } else {
      alert('You need to be logged in to bookmark/unbookmark problems.');
    }
  };

   // Debounce function to limit the rapid execution
   const debounceToggleBookmark = () => {
    if (!isUpdating) {
      setIsUpdating(true);
      setTimeout(async () => {
        await toggleBookmark();
        setIsUpdating(false);
      }, 300); // Adjust the delay time as needed (300ms is a common choice)
    }
  };



  const bookmarkStyle = {
    color: isBookmarked ? '#007bff':'white' , // White when bookmarked, blue otherwise
    cursor: 'pointer',
    transition: 'color 0.3s, background-color 0.3s',
    backgroundColor: isBookmarked ?  'white':'#007bff', // Blue when bookmarked, white otherwise
    border: '2px solid #007bff', // Blue border
    borderRadius: '50%', // Round shape
    position: 'absolute',
    top: '10px',  // Adjust as needed
    right: '10px', // Adjust as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',  // Increased size
    height: '40px', // Increased size
  };

  return (
    <span
      style={bookmarkStyle}
      onClick={toggleBookmark}
    >
      <FontAwesomeIcon icon={isBookmarked ? faBookmark : faBookmarkOutline} />
    </span>
  );
}

export default BookmarkButton;



