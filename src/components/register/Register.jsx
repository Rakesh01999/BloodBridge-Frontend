import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Helmet } from "react-helmet-async";
import { updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleImageUpload = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        const response = await fetch(image_hosting_api, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data.data.url;  // Return the uploaded image URL
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        setRegisterError('');
        setSuccess('');

        // Password validation
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one upper case character.');
            return;
        } else if (!/[a-z]/.test(password)) {
            setRegisterError('Your password should have at least one lower case character.');
            return;
        } else if (!/[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/.test(password)) {
            setRegisterError('Your password should have at least one special character.');
            return;
        }

        try {
            let photoURL = '';
            if (image) {
                photoURL = await handleImageUpload(image);  // Upload the image and get the URL
            }

            const result = await createUser(email, password);
            setSuccess('User Created Successfully.');
            toast.success('User Created Successfully.');

            await updateProfile(result.user, {
                displayName: name,
                photoURL: photoURL || 'default-photo-url-here'
            });

            const userInfo = { name, email, role: "user" };
            const res = await axiosPublic.post('/users', userInfo);

            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            navigate('/');
        } catch (error) {
            console.error(error);
            setRegisterError(error.message);
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            <Helmet>
                <title>Register</title>
            </Helmet>

            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://i.postimg.cc/hGg9XV5j/51671298.jpg')" }}></div>
            <div className="relative w-full max-w-md p-8 bg-white shadow-md rounded-lg mt-20">
                <h1 className="text-3xl font-bold text-center text-red-500 mb-6 animate__animated animate__fadeInDown">
                    Register Now!
                </h1>

                <form onSubmit={handleRegister}>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Enter your name" className="input input-bordered w-full" required />
                    </div>

                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Enter your email" className="input input-bordered w-full" required />
                    </div>

                    {/* File Upload for Image */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Upload Photo</span>
                        </label>
                        <input type="file" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="file-input file-input-bordered w-full" />
                    </div>

                    <div className="form-control w-full mb-6">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" className="input input-bordered w-full" required />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn w-full bg-red-400 hover:bg-orange-500 text-white">
                        Register
                    </button>
                </form>

                {registerError && (
                    <p className="text-red-500 text-center mt-4">{registerError}</p>
                )}

                {success && (
                    <p className="text-green-500 text-center mt-4">{success}</p>
                )}

                <div className="mt-4 text-center">
                    <p>
                        Already have an account? <Link to="/login" className="text-orange-600 font-bold">Login</Link>
                    </p>
                </div>

                <div className="mt-2 text-center">
                    <p>
                        Go back to <Link to="/" className="text-red-500 font-bold">Home</Link>
                    </p>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Register;
