import React from 'react';
import { BrowserRouter as Router, Routes, Route ,HashRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import About from './components/About';
import Work from './components/Work';
import ProjectDescription from './components/ProjectDescription';
import SequenceDiagram from './components/SequenceDiagram';
import Timeline from './components/Timeline';
import ApiCallComponent from './components/ApiCallComponent'; 
import WaifuPicsComponent from './components/WaifuPicsComponent ';
import TheNewsAPIComponent from './components/TheNewsAPIComponent ';
import SchedulerComponent from './components/SchedulerComponent';
import CircleCard from './components/CircleCard';
import ConnectedGraph from './components/ConnectedGraph';
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
    description: `Ce projet a été réalisé au sein du Centre de Développement des Technologies Avancées (CDTA) d'Alger, dans le cadre du développement d’un système de micro-gravure par ablation laser (projet : DSMALIBCP/Division Milieux Ionisés et Laser). Cette initiative interdisciplinaire a nécessité des connaissances approfondies dans des domaines variés tels que la physique, l’optique, l’optoélectronique, la chimie, l’électronique, et l’informatique.

L’équipe "Conception et Fabrication Assistées par Ordinateur" (CFAO) de la Division Productique et Robotique (DPR) a joué un rôle clé en contribuant au développement de la partie logicielle. Plus précisément, ce projet a porté sur l’élaboration et l’intégration d’un convertisseur de fichier DXF en coordonnées XY, synchronisées avec l’état du laser (On/Off), dans un logiciel d’application. Cette étape a également inclus une validation expérimentale pour garantir la fiabilité et la précision du système.`
,
    motivation: 'Automatiser et optimiser le processus de micro-gravure par laser pour des motifs complexes tout en minimisant le temps et les ressources consommées.',
    technologies: ['C++', 'OpenGL', 'DXF'],
    umlImages:[
      `${process.env.PUBLIC_URL}/sequenceDiag1.png`

    ],
    images: [
      `${process.env.PUBLIC_URL}/projetCDTA42.png`,
      `${process.env.PUBLIC_URL}/projetCDTA44.png`,
      `${process.env.PUBLIC_URL}/ProjetLaser74.png`,
      `${process.env.PUBLIC_URL}/ProjetLaser74-1.png`,
      `${process.env.PUBLIC_URL}/ProjetLaser75.png`,
      `${process.env.PUBLIC_URL}/ProjetLaser75-1.png`,
      `${process.env.PUBLIC_URL}/ProjetLaser77.png`,
      `${process.env.PUBLIC_URL}/ProjetLaser77-1.png`,
      `${process.env.PUBLIC_URL}/ProjetLaser73.png`,
      `${process.env.PUBLIC_URL}/ResulatProjetLaser.png`,
    ],
    hasUAVAnimation: false,
    explication: "Ce projet a consisté à développer une application logicielle pour le pilotage automatique d'un système de micro-gravure par laser. L'application permet d'importer des fichiers DXF et d'extraire des entités géométriques telles que des lignes, des polygones et des courbes complexes. Grâce à des algorithmes d'optimisation comme le recuit simulé, le logiciel génère un trajet de micro-gravure optimisé en minimisant le temps de traitement et en réduisant les déplacements inutiles du laser. La validation expérimentale a confirmé la fiabilité du système en réalisant des motifs complexes sur des échantillons de verre, avec une réduction significative du temps de gravure."
  },

  {
    id: 'project5',
    title: 'Simulation Basée sur la Théorie des Jeux pour les Réseaux de Capteurs Sans Fil',
    description: `Ce projet vise à reproduire une simulation issue de l'article "Game Theoretic Approach Towards Energy-efficient Task Distribution in Wireless Sensor Networks". L'objectif principal est de démontrer que l'application de la théorie des jeux permet de réduire la consommation d'énergie des clusters heads. La simulation explore l'utilisation de Sensomax, un middleware, pour répartir stratégiquement les tâches et atteindre l'équilibre de Nash.`,
    motivation: 'Appliquer des stratégies basées sur la théorie des jeux pour optimiser la répartition des tâches et réduire la consommation énergétique dans les réseaux de capteurs sans fil.',
    technologies: ['Python', 'Sensomax Middleware'],
    images: [
      `${process.env.PUBLIC_URL}/diagrammeClasses.png`,
      `${process.env.PUBLIC_URL}/fictitiousPlay.png`,
      `${process.env.PUBLIC_URL}/simulationResult.png`
    ],
    explication: `
      🔍 **Résumé du Projet**

      Ce projet s'inscrit dans le cadre d'une étude approfondie de la répartition des tâches dans les réseaux de capteurs à l'aide de la théorie des jeux. L'utilisation de Sensomax facilite l'agrégation des données et la distribution des tâches en regroupant les capteurs par régions logiques.

      ⚙️ **Méthodologie**

      - Application de l'algorithme Fictitious Play pour calculer les stratégies optimales.
      - Reproduction des scénarios et des gains énergétiques conformément aux stratégies définies (C,c représentant l'équilibre de Nash).
      - Simulation de scénarios avec et sans application de la théorie des jeux pour comparer les résultats énergétiques.

      📊 **Résultats**

      Les simulations démontrent une réduction significative de la consommation d'énergie grâce à l'application de la théorie des jeux. Les graphiques montrent que la stratégie dominante (C,c) assure une convergence vers des solutions énergétiquement optimales pour les clusters.

      🔎 **Critiques**

      Le projet manque de détails sur certains aspects techniques, notamment le pseudo-code de l'algorithme. Cependant, il illustre efficacement l'impact positif de la théorie des jeux dans la gestion des ressources des réseaux de capteurs.
    `,
  },
  {
    id: 'project4',
    title: 'Projet DevOps de Collecte Intelligente de Données',
    description: `**Optimisation des chaînes agroalimentaires et proposition de plats économiques**  
Ce projet interconnecte des technologies modernes pour collecter et analyser les prix des produits alimentaires en promotion (via les circulaires*). Son objectif est de **proposer des recettes adaptées aux promotions**, aidant les utilisateurs à réduire leurs coûts tout en limitant le gaspillage.  

Un **robot logiciel (bot)** automatisé (Selenium/Docker) collecte les données, transmises à une API Spring Boot conteneurisée qui les stocke via LocalStack. L’application mobile React Native permet de visualiser les promotions en temps réel et suggère des plats équilibrés basés sur ces offres.  

*Circulaire* : Catalogue promotionnel (papier ou numérique) annonçant des remises temporaires.`,
    
    motivation: `L’objectif est d’offrir un système complet et automatisé de surveillance des prix alimentaires en temps réel, tout en mettant en œuvre les bonnes pratiques DevOps (conteneurisation, modularité, CI/CD, partage inter-conteneurs). Le projet vise également à renforcer la transparence des prix pour les consommateurs et à fournir un outil d’analyse aux producteurs locaux.`,
    
    technologies: [
      'Docker', 
      'Selenium', 
      'Spring Boot', 
      'LocalStack', 
      'React Native', 
      'GitHub Actions'
    ],
    
    hasUAVAnimation: false, // Bot automatisé, pas de drone physique
  
    explication: `
      🔄 **Automatisation de la Collecte des Prix avec Selenium et Docker**
  
      Un conteneur Docker exécute un navigateur automatisé basé sur **Selenium** afin de récupérer régulièrement les prix affichés publiquement par les épiceries. Cette méthode simule un comportement utilisateur tout en respectant les conditions d’accès des sites web.
  
      🌐 **API Spring Boot et Stockage avec LocalStack**
  
      Les données extraites sont automatiquement transmises à une API **Spring Boot**, déployée dans un conteneur séparé. L’API stocke ensuite ces données dans une base **S3/DynamoDB** simulée grâce à **LocalStack**, ce qui permet de développer localement en imitant les services AWS.
  
      📱 **Visualisation via une Application Mobile React Native**
  
      Une application mobile **React Native** interroge l’API pour afficher les prix en temps réel. L’interface est pensée pour une navigation fluide, avec filtrage par magasin ou produit.
  
      ⚙️ **DevOps et Infrastructure Modulaire**
  
      Ce projet repose sur une architecture **DevOps** moderne :
      - Conteneurisation complète avec **Docker**
      - Déploiement automatisé via **GitHub Actions**
      - Séparation claire des services (scraping, backend, base de données, frontend)
      - Infrastructure locale simulée avec **LocalStack**
  
      Cette approche facilite la maintenance, le test et le déploiement du système tout en rendant le projet évolutif et prêt pour une migration vers le cloud réel (AWS) si nécessaire.
    `,
  },{
    id: 'project3',
    title: 'Système de recommandation de livres avec Neo4j et métadonnées Bibtex',
    description: `**Recommandation de livres via une modélisation en graphe**  
  Ce projet explore l'utilisation de bases de données orientées graphe (Neo4j) pour créer un système de recommandation de livres basé sur les métadonnées Bibtex. L'objectif est de démontrer la supériorité des modèles en graphe face aux SGBD relationnels pour exprimer des relations complexes entre auteurs, genres, et références.`,
  
    motivation: `Comprendre l'intérêt des bases de données orientées graphe dans les systèmes de recommandation modernes, tout en comparant leur performance et flexibilité avec les SGBD relationnels. Ce projet vise également à résoudre la surcharge d'informations littéraires en proposant des suggestions personnalisées.`,
  
    technologies: [
      'Neo4j', 
      'Cypher', 
      'Bibtex', 
      'Python (extraction de données)', 
      'APIs de métadonnées'
    ],
  
    hasUAVAnimation: false, // Aucun composant physique
  
    explication: `
      📚 **Modélisation des données en graphe**  
      Les métadonnées Bibtex (auteurs, éditeurs, genres) sont transformées en nœuds et relations dans Neo4j. Par exemple :  
      - (Livre)-[ÉCRIT_PAR]->(Auteur)  
      - (Livre)-[GENRE]->(Science-Fiction)  
  
      🔍 **Requêtes Cypher pour la recommandation**  
      Exemple de requête personnalisable :  
      \`MATCH (l:Livre)-[:GENRE]->(g)<-[:GENRE]-(reco:Livre) WHERE l.titre = "Dune" RETURN reco\`  
  
      ⚡ **Benchmark Neo4j vs SGBD relationnel**  
      Mesure des temps de réponse pour :  
      - Requêtes relationnelles complexes (JOIN multiples)  
      - Traversée de graphe (e.g., "Livres similaires à ceux aimés par les lecteurs de X")  
  
      📊 **Analyse des avantages/limites**  
      - Flexibilité du modèle graphe pour les relations imbriquées  
      - Limites en termes de volumétrie brute vs solutions NoSQL autres  
      
      🎯 **Cas d'usage concret**  
      Interface permettant aux utilisateurs de saisir :  
      1. Un livre préféré  
      2. Un genre/auteur  
      3. Recevoir des recommandations basées sur les connexions du graphe  
    `,
  
    questionsReponses: {
      traitées: [
        "Pourquoi préférer Neo4j à un SGBD relationnel pour les relations complexes ?",
        "Comment modéliser des métadonnées Bibtex en graphe ?",
        "Quels gains de performance sur les requêtes de recommandation ?"
      ],
      nonTraitées: [
        "Architecture complète d'un système de recommandation industriel",
        "Mécanismes de stockage low-level de Neo4j"
      ]
    },
  
    plan: [
      "Introduction aux bases de données graphe",
      "Extraction/transformation des données Bibtex",
      "Modélisation Neo4j & requêtes Cypher",
      "Benchmark vs SGBD relationnel",
      "Démo de recommandation interactive"
    ],
  
    references: [
      "Dharmawan et al. (2017) - Book recommendation using Neo4j...",
      "Sen et al. (2021) - Recommendation of Influenced Products...",
      "Documentation officielle Neo4j"
    ]
  }
  
  
  // Add other projects similarly
];


function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        {/* Background Animation */}
        <ConnectedGraph />

        {/* Content Wrapper to ensure it's above the animation */}
        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                   <Hero />
                   <br/>
                  <div id='skills'>
                    <Skills />
                    <br/>
                  </div>
                  {/* Add IDs to match navbar links */}
                  <div id="about">
                    <About />
                  </div>
                  <div id="work">
                    <Work />
                  </div>
                  
                  {/* this will be updated  <div id='portailAPI'>
                    <CircleCard />
                  </div> */}
                </>
              }
            />
            <Route path="/project-details/:id" element={<ProjectDescription projects={projectList} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
