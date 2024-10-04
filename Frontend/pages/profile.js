import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../config/firebaseConfig'; // Ensure this import is correct
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Header from '../components/Layout/Header'; // Import the Header component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Import the edit icon

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false); // Track password editing
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [profileImage, setProfileImage] = useState(null); 
  const [userType, setUserType] = useState(''); // Track if the user is a student or faculty
  const router = useRouter();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        // Determine which collection to fetch data from
        const studentDocRef = doc(db, 'users', user.uid);
        const facultyDocRef = doc(db, 'faculty', user.uid);

        // Try to fetch data from 'users' collection
        const studentDocSnap = await getDoc(studentDocRef);
        if (studentDocSnap.exists()) {
          setUserType('student');
          setUserData(studentDocSnap.data());
        } else {
          // Try to fetch data from 'faculty' collection if not found in 'users'
          const facultyDocSnap = await getDoc(facultyDocRef);
          if (facultyDocSnap.exists()) {
            setUserType('faculty');
            setUserData(facultyDocSnap.data());
          } else {
            console.log('No user data found');
          }
        }
      } else {
        router.push('/'); // Redirect if not signed in
      }
    });

    return () => unsubscribe();
  }, [router]);



  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
  
      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          profileImage: reader.result, // Update the profile image preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handlePasswordEditToggle = () => {
    setIsPasswordEditing(!isPasswordEditing);
  };

  const handleProfileUpdate = async () => {
    if (user) {
      const collection = userType === 'student' ? 'users' : 'faculty';
      const docRef = doc(db, collection, user.uid);
  
      try {
        // If an image has been uploaded, upload it to storage first
        if (selectedImage) {
          const storageRef = ref(storage, `profileImages/${user.uid}`);
          await uploadBytes(storageRef, selectedImage);
          const imageUrl = await getDownloadURL(storageRef);
          userData.profileImage = imageUrl; // Update the profileImage with the uploaded image URL
        }
  
        // Prepare the updated data object
        const updatedData = userType === 'student' ? {
          fullname: userData.fullname,
          rollNo: userData.rollNo,
          department: userData.department,
          alternateEmail: userData.alternateEmail,
          profileImage: userData.profileImage,
        } : {
          fullname: userData.fullname,
          department: userData.department,
          facultyID: userData.facultyID,
          phoneNumber: userData.phoneNumber,
          alternateEmail: userData.alternateEmail,
          profileImage: userData.profileImage,
        };
  
        await updateDoc(docRef, updatedData);
  
        alert('Profile updated successfully');
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };
  

  const handlePasswordUpdate = async () => {
    try {
      if (!password || !newPassword) {
        setError('Both password fields are required.');
        return;
      }
      if (newPassword.length < 6) {
        setError('New password should be at least 6 characters long.');
        return;
      }
      // Assume some logic to verify the current password and update to the new one

      setError('');
      alert('Password updated successfully');
      setPassword('');
      setNewPassword('');
      setIsPasswordEditing(false);
    } catch (error) {
      setError(`Error updating password: ${error.message}`);
    }
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>User Information</h1>
        {user ? (
          <div style={styles.profileContainer}>
          <div style={styles.iconContainer}>
          <img
                src={userData.profileImage || '/assets/imgs/Profilepic2.png'} // Placeholder or actual profile image
                alt="Profile Picture"
                style={styles.profileImage}
                onClick={() => document.getElementById('profileImageUpload').click()} // Trigger file input click
              />
              <input
                id="profileImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.hiddenFileInput} // Hide the file input
              />
</div>
            <div style={styles.infoContainer}>
              <div style={styles.infoRow}>
                <label style={styles.label}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={user.email || ''}
                  readOnly
                  style={styles.input}
                />
              </div>
              <div style={styles.infoRow}>
                <label style={styles.label}>Full Name:</label>
                <input
                  type="text"
                  name="fullname"
                  value={userData.fullname || ''}
                  onChange={(e) =>
                    setUserData((prevData) => ({
                      ...prevData,
                      fullname: e.target.value,
                    }))
                  }
                  readOnly={!isEditing}
                  style={styles.input}
                />
              </div>

              {/* Conditionally render fields based on user type */}
              {userType === 'student' && (
                <>
                  <div style={styles.infoRow}>
                    <label style={styles.label}>Roll Number:</label>
                    <input
                      type="text"
                      name="rollNo"
                      value={userData.rollNo || ''}
                      onChange={(e) =>
                        setUserData((prevData) => ({
                          ...prevData,
                          rollNo: e.target.value,
                        }))
                      }
                      readOnly={!isEditing}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.infoRow}>
                    <label style={styles.label}>Department:</label>
                    <input
                      type="text"
                      name="department"
                      value={userData.department || ''}
                      onChange={(e) =>
                        setUserData((prevData) => ({
                          ...prevData,
                          department: e.target.value,
                        }))
                      }
                      readOnly={!isEditing}
                      style={styles.input}
                    />
                  </div>
                </>
              )}

              {userType === 'faculty' && (
                <>
                  <div style={styles.infoRow}>
                    <label style={styles.label}>Department:</label>
                    <input
                      type="text"
                      name="department"
                      value={userData.department || ''}
                      onChange={(e) =>
                        setUserData((prevData) => ({
                          ...prevData,
                          department: e.target.value,
                        }))
                      }
                      readOnly={!isEditing}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.infoRow}>
                    <label style={styles.label}>Faculty ID:</label>
                    <input
                      type="text"
                      name="facultyID"
                      value={userData.facultyID || ''}
                      onChange={(e) =>
                        setUserData((prevData) => ({
                          ...prevData,
                          facultyID: e.target.value,
                        }))
                      }
                      readOnly={!isEditing}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.infoRow}>
                    <label style={styles.label}>Phone Number:</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={userData.phoneNumber || ''}
                      onChange={(e) =>
                        setUserData((prevData) => ({
                          ...prevData,
                          phoneNumber: e.target.value,
                        }))
                      }
                      readOnly={!isEditing}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.infoRow}>
                    <label style={styles.label}>Alternate Email:</label>
                    <input
                      type="email"
                      name="alternateEmail"
                      value={userData.alternateEmail || ''}
                      onChange={(e) =>
                        setUserData((prevData) => ({
                          ...prevData,
                          alternateEmail: e.target.value,
                        }))
                      }
                      readOnly={!isEditing}
                      style={styles.input}
                    />
                  </div>
                </>
              )}

              {isPasswordEditing && (
                <div>
                  <div style={styles.infoRow}>
                    <label style={styles.label}>Current Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.infoRow}>
                    <label style={styles.label}>New Password:</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                </div>
              )}
              {error && <p style={styles.error}>{error}</p>}
              {isEditing && (
                <button onClick={handleProfileUpdate} style={styles.button}>
                  Save Profile
                </button>
              )}
              <div style={styles.editIcon}>
  <FontAwesomeIcon icon={faEdit} onClick={handleEditToggle} />
</div>
              {isPasswordEditing ? (
                <>
                  <button
                    onClick={handlePasswordUpdate}
                    style={styles.button2}
                  >
                    Change Password
                  </button>
                  <button
                    onClick={handlePasswordEditToggle}
                    style={styles.button}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handlePasswordEditToggle}
                  style={styles.button}
                >
                  Change Password
                </button>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '80px',
    textAlign: 'center',
    marginBottom:"20px",

  },
  title: {
    marginBottom: '20px',
    fontSize: '34px',
    fontWeight: 'bold',
  },
  editIcon: {
    position: 'absolute',
    top: '240px',
    right: '240px',
    cursor: 'pointer',
    color: '#007bff',
    fontSize: '20px',
  },
  hiddenFileInput: {
    display: 'none',
  },
  profileContainer: {
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: '50px',
    borderRadius: '10px',
    width:"1000px",
  },
  iconContainer: {
    marginRight: '60px',
    marginTop:"50px",
  },
  profileImage: {
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  infoContainer: {
    flexGrow: 1,
    marginTop:"30px",
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  label: {
    flex: '0 0 150px',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  input: {
    flex: '1',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    marginTop: '20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    marginLeft:'20px',
    // marginTop:"70px",
    borderRadius: '5px',
    cursor: 'pointer',
    // display:"block",
  },
  button2: {
    padding: '10px 20px',
    marginTop: '20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    marginLeft:'20px',
    // marginLeft:'1000px',
    // marginTop:"70px",
    // marginLeft:"150px",
    borderRadius: '5px',
    cursor: 'pointer',
    // display:"block",
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default Profile;


  