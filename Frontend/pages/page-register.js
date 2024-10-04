import {
    createUserWithEmailAndPassword,
    getAuth,
    signOut,
    sendEmailVerification
} from 'firebase/auth';
import {
    doc,
    setDoc,
    getFirestore
} from 'firebase/firestore';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import Link from 'next/link';
import { app } from '../config/firebaseConfig';

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const isDtuEmail = (email) => {
    return email.endsWith('@dtu.ac.in');
};

export default function Register() {
    const [email, setEmail] = useState("");
    const [alternateEmail, setAlternateEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [department, setDepartment] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("/assets/imgs/images.png");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const uploadImage = async (userId) => {
        if (!image) {
            return null;
        }

        const storageRef = ref(storage, `users/${userId}/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Optional: Track upload progress
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const createUser = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!email.includes('@')) {
            setError('Invalid email format. Please enter a valid email.');
            return;
        }

        if (!isDtuEmail(email)) {
            setError('Please enter your DTU email ID.');
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);

            // Upload image to Firebase Storage and get URL
            const profileImageUrl = await uploadImage(user.uid);

            // Save additional user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                fullname,
                rollNo,
                department,
                email,
                alternateEmail,
                profileImage: profileImageUrl || imageUrl
            });

            setSuccess("Registration successful. Please check your email to verify your account.");

            await signOut(auth);

            // Clear form fields
            setFullname("");
            setRollNo("");
            setDepartment("");
            setEmail("");
            setAlternateEmail("");
            setPassword("");
            setConfirmPassword("");
            setImage(null);
            setImageUrl("/assets/imgs/images.png");
        } catch (error) {
            setError(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
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
                                        <h4 className="font text" style={{ color: "#3C65F5" }}>Student</h4>
                                    </div>
                                    <form className="login-register text-start" onSubmit={createUser}>
                                        {error && <p className="text-danger">{error}</p>}
                                        {success && <p className="text-success">{success}</p>}

                                        <div className="form-group" style={{ textAlign: 'center' }}>
                                            <label htmlFor="imageUpload">
                                                <img
                                                    src={imageUrl}
                                                    alt="profile icon"
                                                    style={{ width: '80px', height: '80px', borderRadius: '50%', border: "5px solid black", cursor: 'pointer' }}
                                                />
                                            </label>
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                style={{ display: 'none' }}
                                                onChange={handleImageChange}
                                            />
                                        </div>

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
                                            />
                                        </div>

                                        <div className="form-group" style={{ position: 'relative' }}>
                                            <i className="fas fa-id-card" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}></i>
                                            <input
                                                className="form-control"
                                                type="text"
                                                required
                                                name="rollNo"
                                                placeholder="Roll Number"
                                                onChange={(e) => setRollNo(e.target.value)}
                                                value={rollNo}
                                                style={{ paddingLeft: '40px' }}
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
                                            />
                                        </div>

                                        <div className="form-group" style={{ position: 'relative' }}>
                                            <i className="fas fa-envelope" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}></i>
                                            <input
                                                className="form-control"
                                                type="email"
                                                required
                                                name="email"
                                                placeholder="DTU Email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                style={{ paddingLeft: '40px' }}
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
                                            />
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
                                            />
                                        </div>

                                        <div className="form-group">
                                            <button
                                                className="btn btn-success w-100 hover-up w-100"
                                                type="submit"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? "Registering..." : "Create Account"}
                                            </button>
                                        </div>

                                        <div className="text-muted text-center">
                                            Already have an account?{' '}
                                            <Link href="/">
                                                Sign in
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </Layout>
        </>
    );
}


