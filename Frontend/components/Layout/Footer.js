/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer mt-50">
            <div className="container">
                <div className="row">
                    <div className="footer-col-6">
                        <Link legacyBehavior href="/"><a><img alt="jobBox" src="/assets/imgs/prorep (1).png"  style={{width:"180px"}}/></a></Link>
                        <div className="mt-20 mb-20 font-xs color-text-paragraph-2">ProRep stands at the forefront of the DTU student community, serving as the ultimate resource to explore, connect with, and discover global designers and job opportunities.</div>
                        <div className="footer-social">
                            <a className="icon-socials icon-facebook" href="#" />
                            <a className="icon-socials icon-twitter" href="#" />
                            <a className="icon-socials icon-linkedin" href="#" /></div>
                    </div>
                    <div className="footer-col-4 col-md- col-xs-6" style={{marginLeft:"100px"}}>
                        <h6 className="mb-20 ml-200">Resources</h6>
                        <ul className="menu-footer ml-100" style={{display:"flex",flexDirection:"row"}}>
                            <li>
                                <a href="#" style={{marginRight:"50px"}}>About us</a></li> <li>
                                <a href="#" style={{marginRight:"50px"}}>Our Team</a></li> <li>
                                <a href="#" style={{marginRight:"50px"}}>Products</a></li> <li>
                                <a href="#" style={{marginRight:"50px"}}>Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-col-6 col-md-3 col-sm-12" style={{marginLeft:"500px"}}>
                        <h6 className="mb-20">Download App</h6>
                        <p className="color-text-paragraph-2 font-xs">Download our Apps and get extra 15% Discount on your first Order…!</p>
                        <div className="mt-15">
                            <a className="mr-5" href="#"><img src="assets/imgs/template/icons/app-store.png" alt="joxBox" /></a>
                            <a href="#"><img src="assets/imgs/template/icons/android.png" alt="joxBox" /></a></div>
                    </div>
                </div>
                <div className="footer-bottom mt-50">
                    <div className="row">
                        {/* <div className="col-md-6"><span className="font-xs color-text-paragraph">Copyright © 2022. JobBox all right reserved</span></div> */}
                        {/* <div className="col-md-6 text-md-end text-start">
                            <div className="footer-social">
                                <a className="font-xs color-text-paragraph" href="#">Privacy Policy</a>
                                <a className="font-xs color-text-paragraph mr-30 ml-30" href="#">Terms &amp; Conditions</a>
                                <a className="font-xs color-text-paragraph" href="#">Security</a></div>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;