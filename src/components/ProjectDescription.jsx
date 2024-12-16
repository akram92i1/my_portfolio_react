import React from 'react';
import { useParams } from 'react-router-dom';
import TechnologyDescription from './TechnologyDescription';
import UAVPathAnimation from './UAVPathAnimation';

const ProjectDescription = ({ projects }) => {
  const { id } = useParams();
  const project = projects.find((proj) => proj.id === id);

  if (!project) {
    return <div className="text-center text-red-500 mt-10 animate-bounce">Project not found</div>;
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
        <h3 className="text-2xl font-semibold mb-3 text-blue-700">Technologies Used</h3>
        <TechnologyDescription technologies={project.technologies} />
      </div>

      <div className="border-t border-gray-300 my-6"></div>

      {/* Illustration / Results */}
      {project.images && project.images.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">Illustrations / Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {project.images.map((imgSrc, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
              >
                <img
                  src={imgSrc}
                  alt={`Project screenshot ${index + 1}`}
                  className="w-full h-50 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UAV Path Animation */}
      {/* {project.hasUAVAnimation && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">UAV Path Animation</h3>
          <div className="h-72 sm:h-96 bg-gray-100 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
              <UAVPathAnimation />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProjectDescription;
