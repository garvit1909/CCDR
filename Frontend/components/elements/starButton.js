import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faBookmark as faBookmarkOutline } from '@fortawesome/free-solid-svg-icons';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig'; // Adjust path as needed

const BookmarkButton = ({ problemId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchBookmarkedStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setIsBookmarked((userData.bookmarked || []).includes(problemId));
          }
        } catch (error) {
          console.error("Error fetching bookmarked status: ", error);
        }
      }
    };

    fetchBookmarkedStatus();
  }, [problemId]);

  const toggleBookmark = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);

        if (isBookmarked) {
          // Remove the problemId from the bookmarked array
          await updateDoc(userRef, {
            bookmarked: arrayRemove(problemId)
          });
          setIsBookmarked(false);
        } else {
          // Add the problemId to the bookmarked array
          await updateDoc(userRef, {
            bookmarked: arrayUnion(problemId)
          });
          setIsBookmarked(true);
        }
      } catch (error) {
        console.error("Error updating bookmark: ", error);
      }
    } else {
      alert('You need to be logged in to bookmark problems.');
    }
  };

  const bookmarkStyle = {
    color: isBookmarked ? 'white' : '#007bff', // White when bookmarked, blue otherwise
    cursor: 'pointer',
    transition: 'color 0.3s, background-color 0.3s',
    backgroundColor: isBookmarked ? '#007bff' : 'white', // Blue when bookmarked, white otherwise
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



