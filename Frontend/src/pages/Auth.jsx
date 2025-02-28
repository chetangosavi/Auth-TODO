import  { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
const Auth = () => {
  const [activeTab, setActiveTab] = useState('signup');
  const [formData, setFormData] = useState({ email: '', password: '' });

  // eslint-disable-next-line no-unused-vars
  const {user,setUser} = useContext(AuthContext)

  useEffect(() =>{
    const token = localStorage.getItem('token')
    console.log({token})
    if(token){
        navigate('/dashboard')
    }
  },[])

 const navigate = useNavigate()
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(`${activeTab} data:`, formData);

    if(activeTab === 'signup'){
        try {
            const response = await axios.post('http://localhost:8000/api/auth/signup',{
                email : formData.email,
                password : formData.password
            })
            alert(response.data.message)
            setActiveTab('login')
            console.log({response})
        } catch (error) {
            alert(error.response.data.message)
        }
    }else{
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login',{
                email : formData.email,
                password : formData.password
            })
            alert(response.data.message)
            console.log({response})
            navigate('/dashboard')
            setUser(response.data.user)
            localStorage.setItem('token',response.data.token)

        } catch (error) {
            alert(error.response.data.message)
        }
    }

  };

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <div className='flex justify-between mb-4'>
          <button
            className={`w-1/2 py-2 ${activeTab === 'signup' ? 'border-b-2 border-blue-500 font-bold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
          <button
            className={`w-1/2 py-2 ${activeTab === 'login' ? 'border-b-2 border-blue-500 font-bold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleInputChange}
            className='mb-3 p-2 border rounded'
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
            className='mb-3 p-2 border rounded'
            required
          />
          <button type='submit' className='bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
            {activeTab === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
