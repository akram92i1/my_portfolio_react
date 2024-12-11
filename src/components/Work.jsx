import React from 'react';
import { Link } from 'react-router-dom';
import projetMaitrise from '../assets/ReaserachPaper.webp';
import projetLicence from '../assets/projetLicence.webp';
import projectDatabase from '../assets/DatabaseProjectwebp.webp';
import projectCheapDish from '../assets/CheapDishProjectwebp.webp';
import projectGameTheory from '../assets/GameTheory.webp';

const projects = [
  { id: 'project1', imgSrc: projetMaitrise, title: 'Projet de Maîtriswe' },
  { id: 'project2', imgSrc: projetLicence, title: 'Projet de Licence' },
  { id: 'project3', imgSrc: projectDatabase, title: 'Projet de Base de Données' },
  { id: 'project4', imgSrc: projectCheapDish, title: 'Projet Cheap Dish' },
  { id: 'project5', imgSrc: projectGameTheory, title: 'Projet Théorie des Jeux' },
];

const Work = () => {
  return (
    <div className='max-w-[1200px] mx-auto p-5' id='work'>
      <div className='pb-8 text-left'>
        <p className='text-4xl mb-3 font-bold primary-color'>Mes travaux</p>
        <p className='text-gray-400'>Explorez mes récents projets</p>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {projects.map((project) => (
          <div
            key={project.id}
            className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div h-[300px] md:h-[350px] lg:h-[400px] bg-cover relative'
          >
            <img src={project.imgSrc} alt={project.title} className="w-full h-full object-cover" />
            <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
              <Link to={`/project-details/${project.id}`}>
                <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                  Détail
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
