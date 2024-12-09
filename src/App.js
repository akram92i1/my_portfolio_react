import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import About from './components/About';
import Work from './components/Work';
import ProjectDescription from './components/ProjectDescription';


function App() {
  const projectData = {
    title: 'Task Management Application',
    description:
      'A web-based application that helps users create, manage, and track their tasks efficiently.',
    motivation:
      'The motivation behind this project was to streamline task management and boost productivity.',
    technologies: ['React', 'Express.js', 'MongoDB', 'TailwindCSS'],
    images: [
      'https://via.placeholder.com/400x300', // Replace with actual image URLs
      'https://via.placeholder.com/400x300',
    ],
  };

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Skills />
      <About />
      <Work />
      <ProjectDescription 
       title={projectData.title}
       description={projectData.description}
       motivation={projectData.motivation}
       technologies={projectData.technologies}
       images={projectData.images}
      /> 
    </div>
  );
}

export default App;
