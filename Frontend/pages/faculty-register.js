import Layout from "../components/Layout/Layout";
import Link from "next/link";
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signOut } from 'firebase/auth';
import { app } from '../config/firebaseConfig';
import React, { useState } from "react";
import { useRouter } from 'next/router';

const auth = getAuth(app);
const db = getFirestore(app);

const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [facultyID, setFacultyID] = useState("");
    const [department, setDepartment] = useState("");
    const [alternateEmail, setAlternateEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); // For success messages
    const [loading, setLoading] = useState(false); // For loading state
    const router = useRouter();

    const createUser = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate email format
        if (!isValidEmail(email)) {
            setError('Invalid email format. Please use a valid email ID.');
            return;
        }

        setError(""); // Clear previous errors
        setLoading(true); // Show loading indicator

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Send email verification
            await sendEmailVerification(user);
            setSuccess("Verification email sent. Please check your inbox and verify your email address.");

            // Store user data in Firestore (excluding password)
            await setDoc(doc(db, 'faculty', user.uid), {
                fullname,
                facultyID,
                department,
                email,
                alternateEmail,
                phoneNumber
            });

            // Sign out the user after sending verification email
            await signOut(auth);

            // Reset form fields
            setFullname("");
            setFacultyID("");
            setDepartment("");
            setEmail("");
            setAlternateEmail("");
            setPhoneNumber("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            setError(`Error: ${error.message}`);
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    return (
        <>
            <Layout hideHeader={true}>
                <section className="flex-wrapper">
                    <section className="pt-100 login-register">
                        <div className="container">
                            <div className="row login-register-cover">
                                <div className="col-lg-4 col-md-6 col-sm-12 mx-auto beautify">
                                    <div className="text" style={{ textAlign: "center", marginTop: "50px" }}>
                                        <h2 className="mt-10 mb-5 text-brand-1">Join us today!</h2>
                                        <p className="font-sm text-muted mb-30">Sign up today to become a member</p>
                                        <h4 className="font text mb-30" style={{color:"#3C65F5"}}>Faculty</h4>
                                    </div>
                                    <form className="login-register text-start mt-20" onSubmit={createUser}>
                                        {error && <p className="text-danger">{error}</p>}
                                        {success && <p className="text-success">{success}</p>}
                                        <div className="form-group" style={{ position: 'relative' }}>
                                            <i className="fas fa-user" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}></i>
                                            <input
                                                className="form-control"
                                                type="text"
                                                required
                                                name="fullname"
                                                placeholder="Full Name"
                                                onChange={(e) => setFullname(e.target.value)}
                                                value={fullname}
                                                style={{ paddingLeft: '40px' }}
                                                aria-label="Full Name"
                                            />
                                        </div>
                                        <div className="form-group" style={{ position: 'relative' }}>
                                            <i className="fas fa-id-card" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}></i>
                                            <input
                                                className="form-control"
                                                type="text"
                                                required
                                                name="facultyid"
                                                placeholder="Faculty ID"
                                                onChange={(e) => setFacultyID(e.target.value)}
                                                value={facultyID}
                                                style={{ paddingLeft: '40px' }}
                                                aria-label="Faculty ID"
                                            />
                                        </div>
                                        <div className="form-group" style={{ position: 'relative' }}>
                                            <i className="fas fa-building" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}></i>
                                            <input
                                                className="form-control"
                                                type="text"
                                                required
                                                name="department"
                                                placeholder="Department"
                                                onChange={(e) => setDepartment(e.target.value)}
                                                value={department}
                                                style={{ paddingLeft: '40px' }}
                                                aria-label="Department"
                                            />
                                        </div>
                                        <div className="form-group" style={{ position: 'relative' }}>
                                            <i className="fas fa-envelope" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}></i>
                                            <input
                                                className="form-control"
                                                type="email"
                                                required
                                                name="email"
                                                placeholder="example@dtu.ac.in"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                style={{ paddingLeft: '40px' }}
                                                aria-label="Email"
                                            />
                                        </div>
                                        <div className="form-group" style={{ position: 'relative' }}>
                                            <i className="fas fa-envelope" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}></i>
                                            <input
                                                className="form-control"
                                                type="email"
                                                name="alternateEmail"
                                                placeholder="Alternate Email"
                                                onChange={(e) => setAlternateEmail(e.target.value)}
                                                value={alternateEmail}
                                                style={{ paddingLeft: '40px' }}
                                                aria-label="Alternate Email"
                                            />
                                        </div>
                                        <div className="form-group" style={{ position: 'relative' }}>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1" style={{height:"53px"}}>
                                                        <img src="/assets/imgs/india-flag.png" alt="India Flag" style={{ width: "20px", height: "15px", marginRight: "5px" }} />
                                                        +91
                                                    </span>
                                                </div>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    required
                                                    name="phoneNumber"
                                                    placeholder="Phone Number"
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    value={phoneNumber}
                                                    aria-label="Phone Number"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group" style={{ position: 'relative' }}>
                                            <i className="fas fa-lock" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}></i>
                                            <input
                                                className="form-control"
                                                type="password"
                                                required
                                                name="password"
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                style={{ paddingLeft: '40px' }}
                                                aria-label="Password"
                                            />
                                        </div>
                                        <div className="form-group" style={{ position: 'relative' }}>
                                            <i className="fas fa-lock" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}></i>
                                            <input
                                                className="form-control"
                                                type="password"
                                                required
                                                name="confirmPassword"
                                                placeholder="Confirm Password"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                value={confirmPassword}
                                                style={{ paddingLeft: '40px' }}
                                                aria-label="Confirm Password"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-success w-100" type="submit" disabled={loading}>
                                                {loading ? "Registering..." : "Sign up"}
                                            </button>
                                        </div>
                                        <div className="text-muted text-center">
                                            Already have an account? <Link href="/">Sign in</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="img-1 d-none d-lg-block">
                                    <img className="shape-1" src="assets/imgs/page/login-register/img-1.svg" alt="JobBox" />
                                </div>
                                <div className="img-2">
                                    <img src="assets/imgs/page/login-register/img-2.svg" alt="JobBox" />
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </Layout>
        </>
    );
}
