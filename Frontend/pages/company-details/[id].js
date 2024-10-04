import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import MultiStepFormModal from '../../components/elements/MultiformModel';
import firebase from 'firebase/app'; // Ensure firebase is imported
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import UserCard from '../../components/elements/UserCard';
import { doc, getDoc, collection, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function CompanyDetails() {
    const router = useRouter();
    const { id } = router.query; // Extract the problem-id from the URL
    const [problem, setProblem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(1);
    const [interested, setInterested] = useState(false); // Track interest status
    const [users, setUsers] = useState([]); // Combined list for both students and faculty

    useEffect(() => {
        if (id) {
            fetch(`/api/getProblem?id=${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setProblem(data);
                        fetchUserDetails(data.newArrayField); // Fetch user details
                        checkUserInterest(data.interested); // Check if the current user is interested
                    }
                })
                .catch(error => {
                    console.error('Error fetching problem data:', error.message);
                    setError('An error occurred while fetching data.');
                });
        }
    }, [id]);

    const fetchUserDetails = async (userIds) => {
        if (!userIds || userIds.length === 0) return;
    
        try {
            console.log('Fetching user details for IDs:', userIds); // Log the user IDs being fetched
    
            const usersCollection = collection(db, 'users'); // Use 'users' collection
            const userDocs = await Promise.all(userIds.map(userId => {
                console.log(`Fetching document for user ID: ${userId}`); // Log each user ID being fetched
                return getDoc(doc(usersCollection, userId));
            }));
    
            console.log('Documents fetched:', userDocs); // Log the fetched documents
    
            const userDetails = userDocs.map(doc => {
                if (doc.exists()) {
                    console.log(`Document exists for user ID: ${doc.id}`, doc.data()); // Log data of existing documents
                    return doc.data();
                } else {
                    console.warn(`No document found for user ID: ${doc.id}`); // Log if no document found
                    return null;
                }
            }).filter(data => data !== null);
    
            console.log('User details:', userDetails); // Log the final user details
    
            setUsers(userDetails);
        } catch (error) {
            console.error('Error fetching user details:', error.message);
            setError('An error occurred while fetching user details.');
        }
    };

    const checkUserInterest = async (interested) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const userId = currentUser ? currentUser.uid : null;
    
        if (!userId) return;
    
        const isInterested = interestedUsers.includes(userId);
        setInterested(isInterested);
    };

    const handleApplyClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    const handleInterestToggle = async () => {
        if (!problem) return;
    
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const userId = currentUser ? currentUser.uid : null;
    
        if (!userId) {
            setError('User not authenticated.');
            return;
        }
    
        const newInterested = !interested;
        setInterested(newInterested); // Optimistically update the UI
    
        try {
            // Update user document
            const userDocRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userDocRef);
            const interestedProblems = userDoc.exists() ? userDoc.data().interested || [] : [];
    
            if (newInterested) {
                if (!interestedProblems.includes(id)) {
                    await updateDoc(userDocRef, {
                        interested: arrayUnion(id)
                    });
                }
            } else {
                if (interestedProblems.includes(id)) {
                    await updateDoc(userDocRef, {
                        interested: arrayRemove(id)
                    });
                }
            }
    
            // Update problem document
            const problemDocRef = doc(db, 'problems', id);
            if (newInterested) {
                await updateDoc(problemDocRef, {
                    interestedUsers: arrayUnion(userId)
                });
            } else {
                await updateDoc(problemDocRef, {
                    interestedUsers: arrayRemove(userId)
                });
            }
    
            // Fetch updated problem details
            const response = await fetch(`/api/getProblem?id=${id}`);
            const result = await response.json();
            if (result.error) {
                throw new Error(result.error); // Throw to catch block
            }
            setProblem(prev => ({ ...prev, ...result.updatedProblem })); // Update with actual response data
        } catch (error) {
            console.error('Error updating problem data:', error.message);
            setError(error.message);
            setInterested(!newInterested); // Revert optimistic update on error
        }
    };
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!problem) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Layout>
                <div>
                    <section className="section-box-2">
                        <div className="container">
                            <div className="box-company-profile">
                                <div className="row mt-10">
                                    <div className="col-lg-8 col-md-12">
                                        <h5 className="f-18">
                                            {problem.title} <span className="card-location font-regular ml-20">{problem.department}</span>
                                        </h5>
                                        <p className="mt-5 font-md color-text-paragraph-2 mb-15">{problem.statement}</p>
                                    </div>
                                    <div className="col-lg-4 col-md-12 text-lg-end">
                                        <span className="btn btn-apply" onClick={handleInterestToggle}>
                                            {interested ? 'Remove Interested' : 'Mark Interested'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="box-nav-tabs mt-40 mb-5">
                                <ul className="nav" role="tablist">
                                    <li>
                                        <a className="btn btn-border aboutus-icon mr-15 mb-5 active" onClick={() => handleOnClick(1)}>
                                            Description
                                        </a>
                                    </li>
                                    <li>
                                        <a className="btn btn-border recruitment-icon mr-15 mb-5" onClick={() => handleOnClick(2)}>
                                            End User Applications
                                        </a>
                                    </li>
                                    <li>
                                        <a className="btn btn-border recruitment-icon mr-15 mb-5" onClick={() => handleOnClick(3)}>
                                            Interested Students
                                        </a>
                                    </li>
                                    <li>
                                        <a className="btn btn-border recruitment-icon mr-15 mb-5" onClick={() => handleOnClick(4)}>
                                            Interested Faculty
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="border-bottom pt-10 pb-10" />
                        </div>
                    </section>
                    <section className="section-box mt-50">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                                    <div className="content-single">
                                        <div className="tab-content">
                                            <div className={`tab-pane fade ${activeIndex === 1 && "show active"}`}>
                                                <h4>Description</h4>
                                                <p>{problem.statement}</p>
                                            </div>
                                            <div className={`tab-pane fade ${activeIndex === 2 && "show active"}`}>
                                                <h4>End User Applications</h4>
                                                <p>{problem.end_user}</p>
                                            </div>
                                            <div className={`tab-pane fade ${activeIndex === 3 && "show active"}`}>
                                                <h4>Interested Students</h4>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                                                    {users.map((user, index) => (
                                                        <UserCard key={index} user={user} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className={`tab-pane fade ${activeIndex === 4 && "show active"}`}>
                                                <h4>Interested Faculty</h4>
                                                {/* Add interested faculty display logic here */}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: '#3C64B1', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
                                        <h4 style={{ color: 'white', margin: 0, fontSize: "30px" }}>Funding Sources</h4>
                                        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                            <img 
                                                src="/assets/imgs/drdo.png" 
                                                alt="Funding Logo" 
                                                style={{ width: '40px', height: '40px', marginRight: '10px' }} 
                                            />
                                            <span style={{ flex: 1 }}>{problem.funding_name}</span>
                                            <span><a href={problem.funding_link} style={{ color: '#3C64B1', textDecoration: 'none' }}>Open Link</a></span>
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: '#3C64B1', padding: '20px', borderRadius: '10px' }}>
                                        <h4 style={{ color: 'white', margin: 0 }}>Submitted by</h4>
                                        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                            <img 
                                                src="/assets/imgs/drdo.png" 
                                                alt="Funding Logo" 
                                                style={{ width: '40px', height: '40px', marginRight: '10px' }} 
                                            />
                                            <span>{problem.submitted_by}</span>
                                            <span><a href={problem.submitted_link} style={{ color: '#3C64B1', textDecoration: 'none' }}>Open Link</a></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12 col-12 pl-40 pl-lg-15 mt-lg-30">
                                    <div className="sidebar-border">
                                        <div className="sidebar-heading">
                                            <div className="avatar-sidebar">
                                                <div className="sidebar-info pl-0">
                                                    <span className="sidebar-company">{problem.company}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sidebar-list-job">
                                            <ul>
                                                <li>
                                                    <div className="sidebar-icon-item">
                                                        <i className="fi-rr-briefcase" />
                                                    </div>
                                                    <div className="sidebar-text-info">
                                                        <span className="text-description">Funding Source</span>
                                                        <strong className="small-heading">{problem.funding_name}</strong>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="sidebar-icon-item">
                                                        <i className="fi-rr-marker" />
                                                    </div>
                                                    <div className="sidebar-text-info">
                                                        <span className="text-description">Submitted by</span>
                                                        <strong className="small-heading">{problem.submitted_by}</strong>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="sidebar-icon-item">
                                                        <i className="fi-rr-clock" />
                                                    </div>
                                                    <div className="sidebar-text-info">
                                                        <span className="text-description">Status</span>
                                                        <strong className="small-heading">{problem.status}</strong>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="sidebar-icon-item">
                                                        <i className="fi-rr-time-fast" />
                                                    </div>
                                                    <div className="sidebar-text-info">
                                                        <span className="text-description">Priority</span>
                                                        <strong className="small-heading">{problem.priority === 3 ? 'High' : problem.priority}</strong>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="sidebar-icon-item">
                                                        <i className="fi-rr-calendar" />
                                                    </div>
                                                    <div className="sidebar-text-info">
                                                        <span className="text-description">Due Date</span>
                                                        <strong className="small-heading">{problem.date}</strong>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="sidebar-icon-item">
                                                        <i className="fi-rr-users" />
                                                    </div>
                                                    <div className="sidebar-text-info">
                                                        <span className="text-description">Active Users</span>
                                                        <strong className="small-heading">{problem.newArrayField}</strong>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="sidebar-list-job">
                                            <ul className="ul-disc">
                                                {problem.keywords.filter(Boolean).map((keyword, index) => (
                                                    <li key={index}>{keyword}</li>
                                                ))}
                                            </ul>
                                            <div className="mt-30">
                                                <a className="btn btn-send-message" onClick={handleApplyClick}>Apply Project</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
            <MultiStepFormModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                problemId={problem.id} 
            />
        </>
    );
}

