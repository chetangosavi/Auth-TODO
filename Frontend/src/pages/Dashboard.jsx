import  { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/ui/Modal';
import axios from 'axios';
import ProjectContainer from '../components/ProjectContainer';

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [projectData,setProjectData] = useState({name:''})
  console.log(projectData.name)
  
  
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (e)=>{
    const {value} = e.target
    setProjectData({name:value});
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(projectData)
    try {
      const response = await axios.post('http://localhost:8000/api/auth/project',{name:projectData.name})
      alert(response.data.message)
      console.log({response})
      setModalOpen(false)

    } catch (error) {
      console.error({error:error.message})
    }
  }
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
          Create Project
        </button>
      </div>

      {/* Modal */}
      <Modal open={modalOpen} setOpen={setModalOpen}>
      <h2 className="text-lg font-bold text-center mb-4">Create Project</h2>
        <p className="mt-2 text-center text-gray-600">Enter details to create a new Project.</p>
        <div >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input 
            type="text" 
            placeholder="Project Name" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleOnChange}
          />
          
          <button 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
            type='submit'
          >
            Create
          </button>
          </form>
        </div>
      </Modal>

      <div>
        <ProjectContainer/>
      </div>
    </div>
  );
};

export default Dashboard;
