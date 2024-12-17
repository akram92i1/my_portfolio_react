import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import About from './components/About';
import Work from './components/Work';
import ProjectDescription from './components/ProjectDescription';

const projectList = [
  {
    id: 'project1',
    title: 'Projet de Recherche',
    description: 'Dans le cadre de l\'optimisation des opérations agricoles, cette étude propose des solutions concrètes de planification de trajectoires pour un drone à voilure tournante (UAV) utilisés dans la collecte de données pour l\'Internet des Objets (IoT). L’objectif est d\'optimiser les trajectoires des UAV en minimisant à la fois le temps de mission et la consommation d\'énergie, tout en respectant les contraintes de communication et les délais imposés. Deux approches heuristiques sont présentées : un algorithme de planification quasi-optimale et un algorithme basé sur l\'intelligence artificielle des colonies d\'abeilles (ABC).',
    motivation: 'L\'objectif de ce travail est d\'améliorer l\'efficacité énergétique et temporelle des missions de collecte de données agricoles à l\'aide de drones, afin d\'optimiser les opérations sur le terrain.',
    technologies: ['Python', 'CVX', 'scikit-learn', 'MATLAB'],
    images: [
      `${process.env.PUBLIC_URL}/ResearchUAV.png`,
      `${process.env.PUBLIC_URL}/100CapteurObjTemp.jpg`,
      `${process.env.PUBLIC_URL}/20Mbits5,09_ABC.jpg`,
      `${process.env.PUBLIC_URL}/20Mbits5,09_SCA.jpg`
    ],
    hasUAVAnimation: true,
    explication: `
      🌱 **Optimisation de Trajectoires pour Drones Agricoles**
  
      Dans le cadre de l’optimisation des opérations agricoles, j'ai développé des solutions innovantes pour la planification de trajectoires de drones à voilure tournante (UAV) utilisés pour la collecte de données IoT. Mon approche combine des techniques de clustering comme l'algorithme **K-means** avec une méthode de sélection optimale basée sur **ELBOW**. Cette solution permet de regrouper efficacement les capteurs et d’optimiser le trajet du drone en minimisant à la fois le temps de mission et la consommation énergétique.
  
      🐝 **Approche Basée sur l’Intelligence des Colonies d’Abeilles**
  
      Pour améliorer les résultats obtenus par le clustering, j’ai implémenté une méthode inspirée de l’intelligence artificielle des **colonies d’abeilles (ABC)**. Cette méta-heuristique affine la trajectoires de l'UAV en optimisant chaque groupe de capteurs individuellement. Grâce à cette approche, il est possible d’atteindre des solutions proches de l’optimum tout en respectant les contraintes de communication et les délais imposés par les capteurs IoT.
  
      🚀 **Innovation et Efficacité Énergétique**
  
      Ces solutions d’optimisation offrent une réponse concrète à un problème **NP-difficile** et non convexe, en simplifiant les calculs tout en garantissant des performances élevées. Elles permettent de réduire la complexité des trajets, d’augmenter l’efficacité énergétique du drone et de répondre aux besoins spécifiques des exploitations agricoles modernes. Cette recherche contribue à rendre les missions de collecte de données plus rapides, plus économiques et mieux adaptées aux défis technologiques actuels.
    `,
  },
  {
    id: 'project2',
    title: 'Projet de Licence',
    description: 'Développement d’un logiciel pour le pilotage automatique d’un système de micro-gravure par laser.',
    motivation: 'Automatiser et optimiser le processus de micro-gravure par laser pour des motifs complexes tout en minimisant le temps et les ressources consommées.',
    technologies: ['C++', 'OpenGL', 'DXF'],
    images: ['https://via.placeholder.com/400x300'],
    hasUAVAnimation: false,
    explication: "Ce projet a consisté à développer une application logicielle pour le pilotage automatique d'un système de micro-gravure par laser. L'application permet d'importer des fichiers DXF et d'extraire des entités géométriques telles que des lignes, des polygones et des courbes complexes. Grâce à des algorithmes d'optimisation comme le recuit simulé, le logiciel génère un trajet de micro-gravure optimisé en minimisant le temps de traitement et en réduisant les déplacements inutiles du laser. La validation expérimentale a confirmé la fiabilité du système en réalisant des motifs complexes sur des échantillons de verre, avec une réduction significative du temps de gravure."
  }
  
  // Add other projects similarly
];


function App() {
  return (
    <Router basename="/my_portfolio_react">
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
