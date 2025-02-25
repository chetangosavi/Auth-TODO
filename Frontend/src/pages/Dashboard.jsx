import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/ui/Modal';

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="relative">
          <button
            className="bg-gray-200 px-4 py-2 rounded-lg"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Profile
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  setUser(null);
                  navigate('/auth');
                }} 
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 flex justify-end">
        <button 
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600"
          onClick={() => setModalOpen(true)}
        >
          Create User
        </button>
      </div>

      {/* Modal */}
      <Modal open={modalOpen} setOpen={setModalOpen}>
      <h2 className="text-lg font-bold text-center mb-4">Create User</h2>
        <p className="mt-2 text-center text-gray-600">Enter details to create a new user.</p>
        <div className="flex flex-col gap-4 mt-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
