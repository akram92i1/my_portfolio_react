import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import About from './components/About';
import Work from './components/Work';
import ProjectDescription from './components/ProjectDescription';
import UAVPathAnimation from './components/UAVPathAnimation';

const projectList = [
  {
    id: 'project1',
    title: 'Projet de Recherche',
    description: 'Dans le cadre de l\'optimisation des opérations agricoles, cette étude propose des solutions concrètes de planification de trajectoires pour des drones à voilure tournante (UAV) utilisés dans la collecte de données pour l\'Internet des Objets (IoT). L’objectif est d\'optimiser les trajectoires des UAV en minimisant à la fois le temps de mission et la consommation d\'énergie, tout en respectant les contraintes de communication et les délais imposés. Deux approches heuristiques sont présentées : un algorithme de planification quasi-optimale et un algorithme basé sur l\'intelligence artificielle des colonies d\'abeilles (ABC).',
    motivation: 'L\'objectif de ce travail est d\'améliorer l\'efficacité énergétique et temporelle des missions de collecte de données agricoles à l\'aide de drones, afin d\'optimiser les opérations sur le terrain.',
    technologies: ['Python', 'CVX', 'scikit-learn', 'MATLAB'],
    images: ['https://via.placeholder.com/400x300'],
    hasUAVAnimation: true,
  },
  {
    id: 'project2',
    title: 'Projet de Licence',
    description: 'Description du projet de licence.',
    motivation: 'Motivation pour le projet de licence.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    images: ['https://via.placeholder.com/400x300'],
    hasUAVAnimation: false,
  },
  // Add other projects similarly
];

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Skills />
              <About />
              <Work />
            </>
          }
        />
        <Route path="/project-details/:id" element={<ProjectDescription projects={projectList} />} />
      </Routes>
    </Router>
  );
}

export default App;
