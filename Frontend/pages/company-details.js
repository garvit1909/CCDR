// /* eslint-disable @next/next/no-img-element */
// import Link from "next/link";
// import Layout from "../components/Layout/Layout";
// import React, { useState } from "react";
// import MultiStepFormModal from '../components/elements/MultiformModel';
// export default function CompanyDetails() {
//     const [activeIndex, setActiveIndex] = useState(1);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const handleOnClick = (index) => {
//         setActiveIndex(index);
//     };
//     const handleApplyClick = () => {
//         setIsModalOpen(true);
//       };
    
//       const handleCloseModal = () => {
//         setIsModalOpen(false);
//       };

//     return (
//         <>
//             <Layout>
//                 <div>
//                     <section className="section-box-2">
//                         <div className="container">
//                             <div className="box-company-profile">
//                                 <div className="row mt-10">
//                                     <div className="col-lg-8 col-md-12">
//                                         <h5 className="f-18">
//                                             PR123456 <span className="card-location font-regular ml-20">Framework, Location, Mobile</span>
//                                         </h5>
//                                         <p className="mt-5 font-md color-text-paragraph-2 mb-15">Develop a robust framework to get real time location of mobile users with internal authentication app permissions</p>
//                                     </div>
//                                     <div className="col-lg-4 col-md-12 text-lg-end">
//                                         <span className="btn btn btn-apply ">Active</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="box-nav-tabs mt-40 mb-5">
//                                 <ul className="nav" role="tablist">
//                                     <li>
//                                         <a className="btn btn-border aboutus-icon mr-15 mb-5 active" onClick={() => handleOnClick(1)}>
//                                             Description
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a className="btn btn-border recruitment-icon mr-15 mb-5" onClick={() => handleOnClick(2)}>
//                                             End User Applications
//                                         </a>
//                                     </li>
//                                 </ul>
//                             </div>
//                             <div className="border-bottom pt-10 pb-10" />
//                         </div>
//                     </section>
//                     <section className="section-box mt-50">
//                         <div className="container">
//                             <div className="row">
//                                 <div className="col-lg-8 col-md-12 col-sm-12 col-12">
//                                     <div className="content-single">
//                                         <div className="tab-content">
//                                             <div className={`tab-pane fade ${activeIndex === 1 && "show active"}`}>
//                                                 <h4>Description</h4>
//                                                 <p>Develop a Data analytics & data processing App for predictive policing.- A.I based tool including OSINT for predictive policing Cyber crime analytics using real time data, which involves storing and analyzing huge volume and variety of data in real time, generating patterns / trends Location Data: GPS coordinates and timestamps can be embedded in photos or other media. This can provide context about where and when an artifact was created. Time Stamps: Metadata includes timestamps that can indicate when a file was created, modified, or accessed.</p>
//                                             </div>
//                                             <div className={`tab-pane fade ${activeIndex === 2 && "show active"}`}>
//                                                 <h4>End User Applications</h4>
//                                                 <p>Develop a Data analytics & data processing App for predictive policing - A.I based tool including OSINT for predictive policing Cyber crime analytics using real time data, which involves storing and analyzing huge volume and variety of data in real time, generating patterns / trends Location Data: GPS coordinates and timestamps can be embedded in photos or other media. This can provide context about where and when an artifact was created. Time Stamps: Metadata includes timestamps that can indicate when a file was created, modified, or accessed.</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div style={{ backgroundColor: '#3C64B1', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
//     <h4 style={{ color: 'white', margin: 0 , fontSize:"30px"}}>Funding Sources</h4>
//     <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
//         <img src="/assets/imgs/drdo.png" alt="DRDO Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
//         <span style={{ flex: 1 }}>DRDO</span>
//         <span><a href="#" style={{ color: '#3C64B1', textDecoration: 'none' }}>Open Link</a></span>
//     </div>
// </div>
// <div style={{ backgroundColor: '#3C64B1', padding: '20px', borderRadius: '10px' }}>
//     <h4 style={{ color: 'white', margin: 0 }}>Submitted by</h4>
//     <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
//         <img src="/assets/imgs/drdo.png" alt="DRDO Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
//         <span>DRDO</span>
//     </div>
// </div>
// </div>

//                                 <div className="col-lg-4 col-md-12 col-sm-12 col-12 pl-40 pl-lg-15 mt-lg-30">
//                                     <div className="sidebar-border">
//                                         <div className="sidebar-heading">
//                                             <div className="avatar-sidebar">
//                                                 <div className="sidebar-info pl-0">
//                                                     <span className="sidebar-company">DRDO</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="sidebar-list-job">
//                                             <ul>
//                                                 <li>
//                                                     <div className="sidebar-icon-item">
//                                                         <i className="fi-rr-briefcase" />
//                                                     </div>
//                                                     <div className="sidebar-text-info">
//                                                         <span className="text-description">Funding Source</span>
//                                                         <strong className="small-heading">DRDO</strong>
//                                                     </div>
//                                                 </li>
//                                                 <li>
//                                                     <div className="sidebar-icon-item">
//                                                         <i className="fi-rr-marker" />
//                                                     </div>
//                                                     <div className="sidebar-text-info">
//                                                         <span className="text-description">Submitted by</span>
//                                                         <strong className="small-heading">DRDO</strong>
//                                                     </div>
//                                                 </li>
//                                                 <li>
//                                                     <div className="sidebar-icon-item">
//                                                         <i className="fi-rr-clock" />
//                                                     </div>
//                                                     <div className="sidebar-text-info">
//                                                         <span className="text-description">Status</span>
//                                                         <strong className="small-heading">Apply</strong>
//                                                     </div>
//                                                 </li>
//                                                 <li>
//                                                     <div className="sidebar-icon-item">
//                                                         <i className="fi-rr-time-fast" />
//                                                     </div>
//                                                     <div className="sidebar-text-info">
//                                                         <span className="text-description">Priority</span>
//                                                         <strong className="small-heading">High</strong>
//                                                     </div>
//                                                 </li>
//                                                 <li>
//                                                     <div className="sidebar-icon-item">
//                                                         <i className="fi-rr-calendar" />
//                                                     </div>
//                                                     <div className="sidebar-text-info">
//                                                         <span className="text-description">Due Date</span>
//                                                         <strong className="small-heading">25 Jan</strong>
//                                                     </div>
//                                                 </li>
//                                                 <li>
//                                                     <div className="sidebar-icon-item">
//                                                         <i className="fi-rr-users" />
//                                                     </div>
//                                                     <div className="sidebar-text-info">
//                                                         <span className="text-description">Active Users</span>
//                                                         <strong className="small-heading">6 Active</strong>
//                                                     </div>
//                                                 </li>
//                                             </ul>
//                                         </div>
//                                         <div className="sidebar-list-job">
//                                             <ul className="ul-disc">
//                                                 <li>Software</li>
//                                                 <li>CSE & IT</li>
//                                             </ul>
//                                             <div className="mt-30">
//                                                 <Link legacyBehavior>
//                                                     <a className="btn btn-send-message">Apply Project</a>
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </Layout>
//         </>
//     );
// }



// pages/company-details.js

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import MultiStepFormModal from '../components/elements/MultiformModel';

export default function CompanyDetails() {
    const router = useRouter();
    const { id } = router.query; // Extract the problem-id from the URL
    const [problem, setProblem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(1);

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
                    }
                })
                .catch(error => {
                    console.error('Error fetching problem data:', error.message);
                    setError('An error occurred while fetching data.');
                });
        }
    }, [id]);

    const handleApplyClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOnClick = (index) => {
        setActiveIndex(index);
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
                                            {problem.title} <span className="card-location font-regular ml-20">{problem.location}</span>
                                        </h5>
                                        <p className="mt-5 font-md color-text-paragraph-2 mb-15">{problem.description}</p>
                                    </div>
                                    <div className="col-lg-4 col-md-12 text-lg-end">
                                        <span className="btn btn btn-apply" onClick={handleApplyClick}>Active</span>
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
                                                <p>{problem.description}</p>
                                            </div>
                                            <div className={`tab-pane fade ${activeIndex === 2 && "show active"}`}>
                                                <h4>End User Applications</h4>
                                                <p>{problem.endUserApplications}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: '#3C64B1', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
                                        <h4 style={{ color: 'white', margin: 0, fontSize: "30px" }}>Funding Sources</h4>
                                        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                            <img src={problem.fundingSourceLogo} alt="Funding Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                                            <span style={{ flex: 1 }}>{problem.fundingSource}</span>
                                            <span><a href={problem.fundingSourceLink} style={{ color: '#3C64B1', textDecoration: 'none' }}>Open Link</a></span>
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: '#3C64B1', padding: '20px', borderRadius: '10px' }}>
                                        <h4 style={{ color: 'white', margin: 0 }}>Submitted by</h4>
                                        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                            <img src={problem.submittedByLogo} alt="Submitted Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                                            <span>{problem.submittedBy}</span>
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
                                                        <strong className="small-heading">{problem.fundingSource}</strong>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="sidebar-icon-item">
                                                        <i className="fi-rr-marker" />
                                                    </div>
                                                    <div className="sidebar-text-info">
                                                        <span className="text-description">Submitted by</span>
                                                        <strong className="small-heading">{problem.submittedBy}</strong>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="sidebar-icon-item">
                                                        <i className="fi-rr-clock" />
                                                    </div>
                                                    <div className="sidebar-text-info">
                                                        <span className="text-description">Status</span>
                                                        <strong className="small-heading">Apply</strong>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="sidebar-icon-item">
                                                        <i className="fi-rr-time-fast" />
                                                    </div>
                                                    <div className="sidebar-text-info">
                                                        <span className="text-description">Priority</span>
                                                        <strong className="small-heading">High</strong>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="sidebar-icon-item">
                                                        <i className="fi-rr-calendar" />
                                                    </div>
                                                    <div className="sidebar-text-info">
                                                        <span className="text-description">Due Date</span>
                                                        <strong className="small-heading">25 Jan</strong>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="sidebar-icon-item">
                                                        <i className="fi-rr-users" />
                                                    </div>
                                                    <div className="sidebar-text-info">
                                                        <span className="text-description">Active Users</span>
                                                        <strong className="small-heading">6 Active</strong>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="sidebar-list-job">
                                            <ul className="ul-disc">
                                                <li>Software</li>
                                                <li>CSE & IT</li>
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

            {/* Add the modal component here */}
            <MultiStepFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}

