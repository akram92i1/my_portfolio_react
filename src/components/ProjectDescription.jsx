import React from 'react';
import PropTypes from 'prop-types';

// Import your existing TechnologyDescription component
import TechnologyDescription from './TechnologyDescription';

const ProjectDescription = ({ title, description, motivation, technologies, images }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-10">
      {/* Project Title */}
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2 text-gray-700">Description & Motivation</h3>
        <p className="text-gray-600">{description}</p>
        <p className="mt-2 text-gray-600">{motivation}</p>
      </div>

      {/* Technologies Used */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2 text-gray-700">Technologies Used</h3>
        <TechnologyDescription technologies={technologies} />
      </div>

      {/* Illustration / Results */}
      {images && images.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Illustrations / Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((imgSrc, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={imgSrc}
                  alt={`Project screenshot ${index + 1}`}
                  className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

ProjectDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  motivation: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
};

ProjectDescription.defaultProps = {
  images: [],
};

export default ProjectDescription;
