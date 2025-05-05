import React from 'react';
import { Link } from 'react-router-dom';
import projetMaitrise from '../assets/drone.jpg';
import projetLicence from '../assets/projetLicence.jpg';
import projectDatabase from '../assets/DatabaseProjectwebp.jpg';
import projectCheapDish from '../assets/CheapDishProjectwebp.jpg';
import projectGameTheory from '../assets/GameTheory.jpg';

const projects = [
  { id: 'project1', imgSrc: projetMaitrise, title: 'Projet de Maîtrise' },
  { id: 'project2', imgSrc: projetLicence, title: 'Projet de Licence' },
  { id: 'project3', imgSrc: projectDatabase, title: 'Projet de Base de Données' },
  { id: 'project4', imgSrc: projectCheapDish, title: 'Projet Cheap Dish' },
  { id: 'project5', imgSrc: projectGameTheory, title: 'Projet Théorie des Jeux' },
];

const Work = () => {
  return (
    <section className="max-w-[1200px] mx-auto p-5 bg-black" id="work">
      <header className="pb-8">
        <h2 className=" animate-fade-in text-4xl mb-3 font-bold primary-color">Mes travaux</h2>
        <p className="text-gray-500">Explorez mes récents projets et leurs détails.</p>
      </header>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group transform transition-transform duration-300 hover:scale-105 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={project.imgSrc}
              alt={`Image illustrant ${project.title}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
              <h3 className="text-white text-lg font-semibold mb-3">{project.title}</h3>
              <Link to={`/project-details/${project.id}`}>
                <button className="bg-white text-gray-800 rounded-lg px-5 py-2 font-medium hover:bg-gray-200 focus:ring-2 focus:ring-primary focus:outline-none">
                  Détail
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
