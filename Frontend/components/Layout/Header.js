
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'; // Import useRouter

const Header = ({ handleOpen, handleRemove, openClass }) => {
  const [scroll, setScroll] = useState(0);
  const router = useRouter(); // Use the router

  // List of pages where header links should be hidden
  const noHeaderLinksPages = ['/page-signin', '/page-register'];

  // Check if the current path is in the noHeaderLinksPages array
  const isRestrictedPage = noHeaderLinksPages.includes(router.pathname);

  useEffect(() => {
    const handleScroll = () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    };

    document.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  return (
    <>
      <header className={scroll ? "header sticky-bar stick" : "header sticky-bar"}>
        <div className="container" style={{ marginBottom: '0px' }}>
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
                <Link legacyBehavior href="">
                  <a className="d-flex"><img alt="jobBox" src="/assets/imgs/prorep (1).png" /></a>
                </Link>
              </div>
            </div>
            {/* Conditionally render navigation links */}
            {!isRestrictedPage && (
              <div className="header-nav">
                <nav className="nav-main-menu">
                  <ul className="main-menu">
                    <li>
                      <Link legacyBehavior href="/index-3"><a className="active">Home</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/jobs-grid"><a>Explore all problems</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/companies-grid"><a>Bookmarks</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/active-work"><a>Active Work</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/"><a>Sign in</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/page-register"><a>Register</a></Link>
                    </li>
                  </ul>
                </nav>
                <div className={`burger-icon burger-icon-white ${openClass && "burger-close"}`}
                  onClick={() => { handleOpen(); handleRemove() }}>
                  <span className="burger-icon-top" />
                  <span className="burger-icon-mid" />
                  <span className="burger-icon-bottom" />
                </div>
              </div>
            )}
            <div className="header-right">
            {!isRestrictedPage && (
  <div className="block-signin">
    <Link legacyBehavior href="profile">
      <img src='/assets/imgs/download.png' alt='Download' style={{ width: "70px", height: "70px" }} />
    </Link>
  </div>
)}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <div className="mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">
            <div className="perfect-scroll">
              <div className="mobile-search mobile-header-border mb-30">
                <form action="#">
                  <input type="text" placeholder="Search…" /><i className="fi-rr-search" />
                </form>
              </div>
              <div className="mobile-menu-wrap mobile-header-border">
                {/* mobile menu start*/}
                <nav>
                  <ul className="mobile-menu font-heading">
                    {!isRestrictedPage && ( // Conditionally render mobile menu
                      <>
                        <li className="has-children">
                          <Link legacyBehavior href="/"><a className="active">Home</a></Link>
                          <ul className="sub-menu">
                            <li>
                              <Link legacyBehavior href="/"><a>Home 1</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/index-2"><a>Home 2</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/index-3"><a>Home 3</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/index-4"><a>Home 4</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/index-5"><a>Home 5</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/index-6"><a>Home 6</a></Link>
                            </li>
                          </ul>
                        </li>
                        <li className="has-children">
                          <Link legacyBehavior href="/jobs-grid"><a>Find a Job</a></Link>
                          <ul className="sub-menu">
                            <li>
                              <Link legacyBehavior href="/jobs-grid"><a>Jobs Grid</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/jobs-list"><a>Jobs List</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/job-details"><a>Jobs Details</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/job-details-2"><a>Jobs Details 2</a></Link>
                            </li>
                          </ul>
                        </li>
                        <li className="has-children">
                          <Link legacyBehavior href="/companies-grid"><a>Recruiters</a></Link>
                          <ul className="sub-menu">
                            <li>
                              <Link legacyBehavior href="/companies-grid"><a>Recruiters</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/company-details"><a>Company Details</a></Link>
                            </li>
                          </ul>
                        </li>
                        <li className="has-children">
                          <Link legacyBehavior href="/candidates-grid"><a>Candidates</a></Link>
                          <ul className="sub-menu">
                            <li>
                              <Link legacyBehavior href="/candidates-grid"><a>Candidates Grid</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/candidate-details"><a>Candidate Details</a></Link>
                            </li>
                          </ul>
                        </li>
                        <li className="has-children">
                          <Link legacyBehavior href="/blog-grid"><a>Pages</a></Link>
                          <ul className="sub-menu">
                            <li>
                              <Link legacyBehavior href="/page-about"><a>About Us</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/page-pricing"><a>Pricing Plan</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/page-contact"><a>Contact Us</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/page-register"><a>Register</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/page-signin"><a>Signin</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/page-reset-password"><a>Reset Password</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/page-content-protected"><a>Content Protected</a></Link>
                            </li>
                          </ul>
                        </li>
                        <li className="has-children">
                          <Link legacyBehavior href="/blog-grid"><a>Blog</a></Link>
                          <ul className="sub-menu">
                            <li>
                              <Link legacyBehavior href="/blog-grid"><a>Blog Grid</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/blog-grid-2"><a>Blog Grid 2</a></Link>
                            </li>
                            <li>
                              <Link legacyBehavior href="/blog-details"><a>Blog Single</a></Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link legacyBehavior href="/page-contact"><a>Contact</a></Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
              {!isRestrictedPage && ( // Conditionally render mobile account
                <div className="mobile-account">
                  <h6 className="mb-10">Your Account</h6>
                  <ul className="mobile-menu font-heading">
                    <li>
                      <Link legacyBehavior href="#"><a>Profile</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="#"><a>Work Preferences</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="#"><a>Account Settings</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="#"><a>Go Pro</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/page-signin"><a>Sign Out</a></Link>
                    </li>
                  </ul>
                </div>
              )}
              </div>
             </div> 
             </div>
    </div>
</>
);
};
export default Header;