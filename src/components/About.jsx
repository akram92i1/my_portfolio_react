import React from 'react';
import akram from '../assets/DSC_5607.JPG';

const About = () => {
  const education = [
    {
      title: 'Maîtrise en informatique',
      institution: "Université du Québec à Montréal",
      date: 'Octobre 2024',
      location: 'Montréal, QC, Canada',
    },
    {
      title: "Master en Technologie de l’information",
      institution: "Université De Boumerdès M’hamed Bougara",
      date: 'Septembre 2020',
      location: 'Boumerdès, Algérie',
    },
    {
      title: "Licence en Ingénierie des Systèmes d’information et des Logiciels",
      institution: "Université d’Alger 1",
      date: 'Juillet 2018',
      location: 'Alger, Algérie',
    },
  ];

  const experiences = [
    {
      title: "Démonstrateur et correcteur universitaire",
      institution: "Université du Québec à Montréal",
      date: "Septembre 2021 – Avril 2024",
      location: "Montréal, QC, Canada",
      description: "Encadrement pratique des étudiants en programmation (Java, Matlab) et administration Linux, animation d’ateliers sur Git en contexte agile, et correction des examens pratiques."
    },
    {
      title: "Représentant des ventes",
      institution: "Le choix du président",
      date: "Octobre 2022 – Mars 2023",
      location: "Montréal, QC, Canada",
      description: "Communication et vente des services de l’épicerie Choix du Président."
    },
    {
      title: "Développeur full stack",
      institution: "École Nationale Polytechnique d’Alger",
      date: "Février 2020 – Octobre 2020",
      location: "Alger, Algérie",
      description: "Développement d’une plateforme collaborative (Vue.js/Firebase) pour l’automatisation des processus institutionnels."
    },
    {
      title: "Développeur dans un centre de recherche",
      institution: "Centre de Développement des Technologies Avancées",
      date: "Janvier 2018 – Juillet 2018",
      location: "Alger, Algérie",
      description: "Modélisation et développement d’un logiciel pour la micro-gravure par laser et création d’un algorithme métaheuristique pour l’optimisation."
    },
  ];

  return (
    <div className='text-white max-w-[1200px] mx-auto' id='about'>
      <div className='md:grid md:grid-cols-3 sm:py-16 gap-4'>
        {/* Left Side - Education */}
        <div className='mt-4 md:mt-0 text-left'>
          <div className='my-auto mx-6 text-left'>
            <h2 className='text-3xl font-bold text-center mb-4 primary-color'>Parcours Éducatif</h2>
            <ol className='relative border-l border-gray-300'>
              {education.map((item, index) => (
                <li key={index} className='mb-8 ml-4'>
                  <div className='absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 border border-white'></div>
                  <div className='p-3 border-gray-200 rounded-lg shadow-sm'>
                    <h3 className='text-md font-semibold'>{item.title}</h3>
                    <p className='text-gray-600'>{item.institution}</p>
                    <p className='text-sm text-gray-500'>{item.date}</p>
                    <p className='text-sm text-gray-500'>{item.location}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Center - Image */}
        <div className='flex justify-center items-start'>
          <img className='rounded-3xl' width={400} height={400} src={akram} alt="Akram KHELILI" />
        </div>

        {/* Right Side - Experience */}
        <div className='mt-4 md:mt-0 text-left'>
          <div className='my-auto mx-6 text-left'>
            <h2 className='text-3xl font-bold text-center mb-4 primary-color'>Parcours professionnel</h2>
            <ol className='relative border-l border-gray-300'>
              {experiences.map((item, index) => (
                <li key={index} className='mb-8 ml-4'>
                  <div className='absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 border border-white'></div>
                  <div className='p-3 border-gray-200 rounded-lg shadow-sm'>
                    <h3 className='text-md font-semibold'>{item.title}</h3>
                    <p className='text-gray-600'>{item.institution}</p>
                    <p className='text-sm text-gray-500'>{item.date}</p>
                    <p className='text-sm text-gray-500'>{item.location}</p>
                    <p className='text-sm text-gray-500 mt-2'>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
