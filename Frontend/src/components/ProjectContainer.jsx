import axios from "axios";
import { useEffect, useState } from "react";

const ProjectContainer = () => {
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/auth/project");
                setProjectData(response.data); 
            } catch (error) {
                console.error({ error: error.message });
            }
        };

        fetchProjects();
    });

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-6">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {projectData.map((project) => (
                    <div key={project._id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all">
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                        <p className="text-gray-600 mt-2">Created at: {new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectContainer;
