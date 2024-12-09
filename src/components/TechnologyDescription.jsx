import React from 'react';
import PropTypes from 'prop-types';

const TechnologyDescription = ({ technologies }) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {technologies.map((tech, index) => (
        <li
          key={index}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
};

TechnologyDescription.propTypes = {
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TechnologyDescription;
