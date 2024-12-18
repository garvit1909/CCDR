/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="footer bg-light text-dark pt-5 pb-4">
            <div className="container">
                {/* Main Row */}
                <div className="row d-flex justify-content-between align-items-start">

                    {/* Logo and Description */}
                    <div className="col-lg-4 col-md-12 text-start mb-4 mb-lg-0">
                        <Link href="/" legacyBehavior>
                            <Image 
                                src="/assets/imgs/ccdr-logo.png" 
                                alt="CCDR Logo" 
                                width={200}
                                height={60} 
                                priority
                            />
                        </Link>
                        <p className="text-muted mt-3" style={{ lineHeight: "1.6" }}>
                            The Centre for Community Development and Research (CCDR) at Delhi Technological University (DTU) is dedicated to fostering sustainable community development through impactful research, capacity-building initiatives, and collaborative partnerships.
                        </p>
                    </div>

                    {/* Resources Section */}
                    <div className="col-lg-4 col-md-12 text-center mb-4 mb-lg-0" style={{width:"500px"}}>
                        <h5 className="fw-bold mb-3">Resources</h5>
                        <div 
                            className="d-flex justify-content-center gap-4"
                            style={{ flexWrap: "wrap" }}
                        >
                            <Link href="/index-3" className="text-decoration-none text-dark" style={{ whiteSpace: "nowrap" }}>
                                About Us
                            </Link>
                            <Link href="/index-3" className="text-decoration-none text-dark" style={{ whiteSpace: "nowrap" }}>
                                Core Members
                            </Link>
                            <Link href="/index-3" className="text-decoration-none text-dark" style={{ whiteSpace: "nowrap" }}>
                                Strategic Goals
                            </Link>
                            <Link href="/index-3" className="text-decoration-none text-dark" style={{ whiteSpace: "nowrap" }}>
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Download App Section */}
                    <div className="col-lg-4 col-md-12 text-end"  style={{width:"200px"}}>
                        <h5 className="fw-bold mb-3">Download App</h5>
                        <p className="text-muted">Get our mobile app:</p>
                        <Link href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                            <Image 
                                src="/assets/imgs/template/icons/android.png" 
                                alt="Download App" 
                                width={150} 
                                height={50}
                            />
                        </Link>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="text-center border-top pt-3 mt-4">
                    <small className="text-muted">
                        &copy; {new Date().getFullYear()} CCDR, DTU. All Rights Reserved.
                    </small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
