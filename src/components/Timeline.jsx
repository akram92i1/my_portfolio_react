import React from 'react';

const Timeline = () => {
  const education = [
    {
      title: 'Maîtrise en informatique',
      institution: "Université du Québec à Montréal",
      date: 'Janvier 2021 – Octobre 2024',
      location: 'Montréal, QC, Canada',
    },
    {
      title: "Master en Technologie de l’information",
      institution: "Université De Boumerdès M’hamed Bougara",
      date: '2020',
      location: 'Boumerdès, Algérie',
    },
    {
      title: "Licence en Ingénierie des Systèmes d’information et des Logiciels",
      institution: "Université d’Alger 1",
      date: '2018',
      location: 'Alger, Algérie',
    },
  ];

  return (
    <div className="p-6 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8">Parcours Éducatif</h2>
        <ol className="relative border-l border-gray-300">
          {education.map((item, index) => (
            <li key={index} className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 border border-white"></div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.institution}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Timeline;
