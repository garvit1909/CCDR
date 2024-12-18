
import { useEffect, useState } from 'react';
import { db, auth } from '../config/firebaseConfig'; // Ensure firebaseConfig exports both db and auth
import { collection, query, where, getDocs, doc, getDoc, documentId } from 'firebase/firestore';
import Layout from '../components/Layout/Layout';
import BlogSlider from '../components/sliders/Blog';
import UnbookmarkButton from '../components/elements/UnbookButton';
import Link from 'next/link';

const BookmarkPage = () => {
  const [bookmarkedProblems, setBookmarkedProblems] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Set up authentication state listener to get the current user ID
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUserId(user.uid);
        console.log('User ID:', user.uid); // Debugging: check if user ID is available
      } else {
        console.error('User is not logged in');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'users', currentUserId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const problemIds = userData.bookmarked || [];
          console.log('Bookmarked Problem IDs:', problemIds); // Verify problem IDs
          if (problemIds.length > 0) {
            fetchBookmarkedProblems(problemIds);
          }
        } else {
          console.error('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchBookmarkedProblems = async (problemIds) => {
      try {
        console.log('Fetching problems for IDs:', problemIds); // Debugging: check problem IDs
    
        // Firestore query using the custom 'id' field within the documents
        const problemsRef = collection(db, 'problems');
        const q = query(problemsRef, where('id', 'in', problemIds)); // 'id' should match your custom field name in the documents
        const snapshot = await getDocs(q);
    
        // Map over the snapshot to get the data
        const problems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched Problems:', problems); // Verify problems data
    
        setBookmarkedProblems(problems);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };
    

    fetchUserData();
  }, [currentUserId]);

  const handleRemoveProblem = (problemId) => {
    setBookmarkedProblems(prevProblems => prevProblems.filter(problem => problem.id !== problemId));
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <Layout>
      <section className="section-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="content-page">
                <div className="row">
                  <div className="bookmark-page">
                    <h2 style={{
                      textAlign: 'center',
                      margin: '20px 0',
                      padding: '10px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '10px',
                      color: '#333',
                    }}>
                      Bookmarked Problems
                    </h2>
                    {bookmarkedProblems.map(problem => (
                      <div key={problem.id} className="col-xl-8 col-lg-8-col-md-8 col-sm-12 col-12" style={{ width: "1330px", padding: "25px" }}>
                        <div className="card-grid-2 hover-up" style={{ height: "300px" }}>
                          <div className="card-grid-2-image-left">
                            <span>
                              <UnbookmarkButton problemId={problem.id} onRemove={() => handleRemoveProblem(problem.id)} />
                            </span>
                            <div className="image-box">
                              <img src="/assets/imgs/ccdr-logo.png" alt="jobBox" width="100" height="40" />
                            </div>
                            <div className="right-info">
                              <a href="#" className="name-job">{problem.title}</a>
                              <span className="small">
                                <i className="fas fa-globe" style={{ marginRight: '5px', fontSize: '12px' }}></i> {problem.domain}
                              </span>
                            </div>
                          </div>
                          <div className="card-block-info">
                            <h4>
                          <Link legacyBehavior href={`/company-details/${problem.id}`}>{problem.title}</Link>
                            </h4>
                            <div className="mt-5">
                              <span className="card-briefcase">{problem.funding}</span>
                              <span className="card-time">
                                <span>{problem.date}</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-10" style={{ height: '60px', overflow: 'hidden' }}>
                              {truncateText(problem.statement, 300)}
                            </p>
                            <div className="card-2-bottom mt-20">
                              <div className="row">
                                <div className="col-lg-6 col-6">
                                  <div className="d-flex">
                                    {/* <img className="img-rounded" src="assets/imgs/page/homepage1/user1.png" alt="jobBox" /> */}
                                    <div className="info-right-img">
                                      <span className="font-sm font-bold color-brand-1 op-70">{problem.user}</span>
                                      <span className="font-xs color-text-paragraph-2">{problem.domain}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-6 text-end">
                                <Link legacyBehavior href={`/company-details/${problem.id}`}>
                                      <a className="btn btn-apply-now" >View Details</a>
                                    </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="paginations">
                <ul className="pager">
                  <li><a className="pager-prev" href="#" /></li>
                  <li><a className="pager-number" href="#">1</a></li>
                  <li><a className="pager-number" href="#">2</a></li>
                  <li><a className="pager-number" href="#">3</a></li>
                  <li><a className="pager-number" href="#">4</a></li>
                  <li><a className="pager-number" href="#">5</a></li>
                  <li><a className="pager-number active" href="#">6</a></li>
                  <li><a className="pager-number" href="#">7</a></li>
                  <li><a className="pager-next" href="#" /></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Unmodified footer and other sections */}

    </Layout>
  );
};

export default BookmarkPage;













