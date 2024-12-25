import React from 'react';
import { useParams } from 'react-router-dom';
import TechnologyDescription from './TechnologyDescription';
import UAVPathAnimation from './UAVPathAnimation';

const ProjectDescription = ({ projects }) => {
  const { id } = useParams();
  const project = projects.find((proj) => proj.id === id);

  if (!project) {
    return <div className="text-center text-red-500 mt-10 animate-bounce">Projet non trouvé</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-lg mb-10">
      {/* Project Title */}
      <h2 className="text-4xl font-extrabold mb-4 text-gray-900 animate-fade-in">
        {project.title}
      </h2>

      <div className="border-t border-gray-300 my-6"></div>

      {/* Project Description and Motivation */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-3 text-blue-700">Description & Motivation</h3>
        <p className="text-gray-700 leading-relaxed">{project.description}</p>
        <p className="mt-3 text-gray-700 leading-relaxed">{project.motivation}</p>
      </div>

      <div className="border-t border-gray-300 my-6"></div>

      {/* Technologies Used */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-3 text-blue-700">Technologies Utilisées</h3>
        <TechnologyDescription technologies={project.technologies} />
      </div>

      <div className="border-t border-gray-300 my-6"></div>

      {/* Explication Section */}
      <div className="mt-6 bg-blue-50 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-blue-700">Explication</h3>
        <div className="text-gray-800 leading-relaxed space-y-4">
          {project.explication.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      {/* UAV Path Animation */}
      {/* {project.hasUAVAnimation && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">Animation de la Trajectoire du Drone</h3>
          <div className="h-72 sm:h-96 bg-gray-100 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
            <UAVPathAnimation />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProjectDescription;
