import { useRouter } from 'next/router'; 
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import MultiStepFormModal from '../../components/elements/MultiformModel';
import firebase from 'firebase/app';
import { getAuth } from "firebase/auth";
import UserCard from '../../components/elements/UserCard';
import { doc, getDoc, collection, updateDoc, arrayUnion, arrayRemove, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { onSnapshot } from 'firebase/firestore';

export default function CompanyDetails() {
    const router = useRouter();
    const { id } = router.query; // Extract the problem-id from the URL
    const [problem, setProblem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(1);
    const [interested, setInterested] = useState(false);
    const [users, setUsers] = useState([]); // Combined list for both students and faculty

   

useEffect(() => {
    if (id) {
        const problemsRef = collection(db, 'problems');
        const q = query(problemsRef, where("id", "==", id));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (!querySnapshot.empty) {
                const updatedProblem = querySnapshot.docs[0].data();
                setProblem(updatedProblem);
                fetchUserDetails(updatedProblem.interestedUsers); // Fetch user details for updated list
                checkUserInterest(updatedProblem.interestedUsers); // Check user interest on update
            }
        }, (error) => {
            console.error('Error listening to problem data:', error);
            setError('An error occurred while listening to data.');
        });
        
        return () => unsubscribe();
    }
}, [id]);


    const fetchUserDetails = async (userIds) => {
        if (!userIds || userIds.length === 0) return;
    
        try {
            const usersCollection = collection(db, 'users');
            const userDocs = await Promise.all(userIds.map(userId => getDoc(doc(usersCollection, userId))));
            const userDetails = userDocs.map(doc => doc.exists() ? doc.data() : null).filter(data => data !== null);
            console.log('Fetched user details:', userDetails);
            setUsers(userDetails);
        } catch (error) {
            console.error('Error fetching user details:', error.message);
            setError('An error occurred while fetching user details.');
        }
    };

    const checkUserInterest = async (interestedUsers) => {
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

    const handleInterestToggle = async (interestedUsers) => {
        if (!problem) return;

        const auth = getAuth();
        const currentUser = auth.currentUser;
        const userId = currentUser ? currentUser.uid : null;

        if (!userId) {
            setError('User not authenticated.');
            return;
        }

        // const isInterested = interestedUsers.includes(userId);
        // setInterested(isInterested); // Set the "interested" state for the current user
        const newInterested = !interested;
        setInterested(newInterested); // Optimistically update the UI

        try {
            // Fetch the document ID by querying the 'problems' collection based on the 'id' field
            const problemsRef = collection(db, 'problems');
            const q = query(problemsRef, where("id", "==", problem.id));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error("No matching document found for the specified 'id' field.");
            }

            const problemDocRef = querySnapshot.docs[0].ref;

            // Update user document
            const userDocRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userDocRef);
            const interestedProblems = userDoc.exists() ? userDoc.data().interested || [] : [];

            if (newInterested) {
                if (!interestedProblems.includes(problem.id)) {
                    await updateDoc(userDocRef, {
                        interested: arrayUnion(problem.id)
                    });
                }
            } else {
                if (interestedProblems.includes(problem.id)) {
                    await updateDoc(userDocRef, {
                        interested: arrayRemove(problem.id)
                    });
                }
            }

            // Update problem document
            if (newInterested) {
                await updateDoc(problemDocRef, {
                    interestedUsers: arrayUnion(userId)
                });
            } else {
                await updateDoc(problemDocRef, {
                    interestedUsers: arrayRemove(userId)
                });
               
            }
             window.location.reload();


        // // Reload the page to fetch the fresh data from the database
        // window.location.reload();
        
            // Fetch updated problem details
            const response = await fetch(`/api/getProblem?id=${problem.id}`);
            const result = await response.json();
            if (result.error) {
                throw new Error(result.error);
            }
            setProblem(prev => ({ ...prev, ...result.updatedProblem }));
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
                                            Interested
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
                                                {/* <h4>Interested Students</h4>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                                                    {users.map((user, index) => (
                                                        <UserCard key={index} user={user} />
                                                    ))}
                                                </div> */}
                                          
<h4>Interested Students</h4>
<table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', marginBottom:"50px" }}>
    <thead>
        <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>#</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Full Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Roll Number</th>
        </tr>
    </thead>
    <tbody>
        {users.map((user, index) => (
            <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.fullname || "N/A"}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email || "N/A"}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.rollNo || "N/A"}</td>
            </tr>
        ))}
    </tbody>
</table>
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
                                                        {/* <strong className="small-heading">{problem.interestedUsers}</strong> */}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="sidebar-list-job">
                                            {/* <ul className="ul-disc">
                                                {problem.keywords.filter(Boolean).map((keyword, index) => (
                                                    <li key={index}>{keyword}</li>
                                                ))}
                                            </ul> */}
                                            <div className="mt-30">
                                                <a className="btn btn-send-message" onClick={handleInterestToggle}>Apply Project</a>
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

