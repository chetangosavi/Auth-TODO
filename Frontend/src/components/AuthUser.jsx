import { useState } from "react";
import login from "../assets/login.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthUser = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      if (isLogin) {
        
        const response = await axios.post("http://localhost:8000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", response.data.token);
        alert(response.data.message);
        navigate("/dashboard");
      } else {
        
        const response = await axios.post("http://localhost:8000/api/auth/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        alert(response.data.message);
        setFormData({ name: "", email: "", password: "" }); 
        setIsLogin(true); 
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-100 h-screen w-full flex items-center justify-center">
      <div className="flex bg-white rounded-2xl shadow-lg p-8 gap-8 w-[600px]">
        <div className="rounded-lg overflow-hidden hidden md:block">
          <img src={login} alt="auth-img" className="w-72 h-full object-cover" />
        </div>
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            {isLogin ? "Welcome Back!" : "Join Us Today!"}
          </h1>
          <p className="text-sm text-gray-600 text-center mb-4">
            Simplify your workflow and boost productivity with <b>Taskly App.</b>
          </p>
          <div className="flex justify-center gap-3 bg-gray-200 p-1 rounded-full mb-5">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isLogin ? "bg-blue-500 text-white" : "text-gray-700"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !isLogin ? "bg-blue-500 text-white" : "text-gray-700"
              }`}
              onClick={() => {
                setIsLogin(false);
                setFormData({ name: "", email: "", password: "" }); // Reset form
              }}
            >
              Signup
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.name}
                onChange={handleOnChange}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleOnChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.password}
              onChange={handleOnChange}
              required
            />
            <button className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all">
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthUser;
