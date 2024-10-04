import React, { useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import { FaEdit } from 'react-icons/fa';
import Link from 'next/link';
const ActiveWorkPage = () => {
  const [groups, setGroups] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [userInfo, setUserInfo] = useState({}); // State to store user info

  useEffect(() => {
    const fetchGroups = async () => {
      const querySnapshot = await getDocs(collection(db, "group"));
      const groupsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGroups(groupsData);
    };

    const fetchUserInfo = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userUID = currentUser.uid;
          const userDoc = await getDoc(doc(db, "users", userUID));
          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('User not logged in');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchGroups();
    fetchUserInfo();
  }, []);

  const handleInputChange = (event, groupId, field, index, subfield) => {
    const { name, value } = event.target;
    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId ? { 
          ...group, 
          [field]: Array.isArray(group[field])
            ? group[field].map((item, i) => i === index ? { ...item, [subfield]: value } : item)
            : { ...group[field], [name]: value } 
        } : group
      )
    );
  };

  const handleSaveChanges = async (groupId) => {
    const groupToUpdate = groups.find(group => group.id === groupId);
    const groupDocRef = doc(db, "group", groupId);
    await updateDoc(groupDocRef, groupToUpdate);
    alert('Changes saved successfully!');
    setEditMode(prevEditMode => ({ ...prevEditMode, [groupId]: false }));
  };

  const toggleEditMode = (groupId) => {
    setEditMode(prevEditMode => ({ ...prevEditMode, [groupId]: !prevEditMode[groupId] }));
  };

  return (
    <div>
      <Header /> {/* Use imported Header component */}
      <main style={mainStyle}>
        <h1 style={titleStyle}>Active Work</h1>
        {userInfo.fullname && (
          <div style={userInfoStyle}>
            <h2>User Info</h2>
            <p>Full Name: {userInfo.fullname}</p>
            <p>Email: {userInfo.email}</p>
            <p>Roll No: {userInfo.rollNo}</p>
          </div>
        )}
        <div style={cardContainerStyle}>
        {groups.map(group => (
          <div key={group.id} style={cardStyle}>
            <div style={headerStyle}>
              <span style={problemIdStyle}>#{group.problemId}</span>
              <FaEdit style={editIconStyle} onClick={() => toggleEditMode(group.id)} />
            </div>
            {editMode[group.id] ? (
              <input
                type="text"
                value={group.problemTitle}
                onChange={(e) => handleInputChange(e, group.id, 'problemTitle')}
                name="problemTitle"
                style={inputStyle}
              />
            ) : (
              <h2 style={problemTitleStyle}>{group.problemTitle}</h2>
            )}
            <div style={tagsContainerStyle}>
              {group.tags && group.tags.map((tag, index) => (
                <span key={index} style={tagStyle}>{tag}</span>
              ))}
            </div>
            <div style={detailsContainerStyle}>
              <p>Problem Id: {group.problemId}</p>
              <p>Status: Yes</p>
              <p>
                Start Date: {editMode[group.id] ? (
                  <input
                    type="date"
                    value={group.timeline.startDate}
                    onChange={(e) => handleInputChange(e, group.id, 'timeline', null, 'startDate')}
                    name="startDate"
                    style={inputStyle}
                  />
                ) : (
                  new Date(group.timeline.startDate).toLocaleDateString()
                )}
              </p>
              <p>
                End Date: {editMode[group.id] ? (
                  <input
                    type="date"
                    value={group.timeline.deadline}
                    onChange={(e) => handleInputChange(e, group.id, 'timeline', null, 'deadline')}
                    name="deadline"
                    style={inputStyle}
                  />
                ) : (
                  new Date(group.timeline.deadline).toLocaleDateString()
                )}
              </p>
             
            </div>
            <div style={participantsStyle}>
              <p>Students:</p>
              {group.students && group.students.map((student, index) => (
                <p key={index}>
                  {editMode[group.id] ? (
                    <>
                      <input
                        type="text"
                        value={student.name}
                        onChange={(e) => handleInputChange(e, group.id, 'students', index, 'name')}
                        name="name"
                        style={inputStyle}
                      />
                      <input
                        type="text"
                        value={student.dtuId}
                        onChange={(e) => handleInputChange(e, group.id, 'students', index, 'dtuId')}
                        name="dtuId"
                        style={inputStyle}
                      />
                    </>
                  ) : (
                    `${student.name} (${student.dtuId})`
                  )}
                </p>
                

              ))}
            </div>
            <p>
              <Link legacyBehavior href="/company-details">
                                      <a className="btn btn-apply-now">View Problem</a>
                                    </Link>
              </p>
            {editMode[group.id] && (
              <button onClick={() => handleSaveChanges(group.id)} style={buttonStyle}>
                Save Changes
              </button>
            )}
          </div>
        ))}
    </div>
      </main>
      <Footer /> {/* Use imported Footer component */}
    </div>
  );
};

const mainStyle = {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };
  
  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    width: '100%',
  };
  
  const userInfoStyle = {
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
  };
  
  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    width:"1500px",
  };
  
  const cardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    margin: '20px 0',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: 'calc(50% - 20px)',
    boxSizing: 'border-box',
  };
  
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  };
  
  const problemIdStyle = {
    fontWeight: 'bold',
    color: '#007BFF',
  };
  
  const editIconStyle = {
    cursor: 'pointer',
    fontSize: '1.5em',
    color: '#007BFF',
  };
  
  const problemTitleStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '10px',
  };
  
  const tagsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    marginBottom: '10px',
  };
  
  const tagStyle = {
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    padding: '5px 10px',
  };
  
  const detailsContainerStyle = {
    marginBottom: '10px',
  };
  
  const participantsStyle = {
    marginBottom: '10px',
  };
  
  const inputStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
    margin: '5px 0',
    width: '100%',
    boxSizing: 'border-box',
  };
  
  const buttonStyle = {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  
export default ActiveWorkPage;

