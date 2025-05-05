import React from 'react';
import javaLogo from '../assets/java.png';
import pythonLogo from '../assets/Python.png';
import VueJs from '../assets/Vuejs.png';
import CplusLogo from '../assets/Cplus.png';
import SQLogo from '../assets/SQL.png';
import ocamLogo from '../assets/Ocaml.png';
import matLabLogo from '../assets/Matlab.png';
import DockerLogo from '../assets/Docker.png';
import AnsibleLogo from '../assets/Ansible.png';
import JenkinsLogo from '../assets/Jenkins.png';
import Kubernetes from '../assets/Kubernetes.png';
import LocalStack from '../assets/Localstack.png';
import Oketeto from '../assets/Okteto.png';
import ZUULogo from '../assets/ZUUL.png';
import AWS3Logo from '../assets/AWS3.png';
import VagrantLogo from '../assets/Vagrant.png';
import MysqLogo from '../assets/Mysql.png';
import mongoDbLogo from '../assets/mongodb.png';
import Neo4j from '../assets/Neo4j.png';
import Reactjs from '../assets/react.png';
import Nodejs from '../assets/nodejs.png';
import DjangoLogo from '../assets/Django.png';

const Section = ({ title, items }) => (
  <div className="bg-black text-gray-200 max-w-[1200px] mx-auto px-4 py-6">
    {title === "Langages maîtrisés" && <h2 className='text-4xl animate-fade-in font-bold primary-color mb-8'>Compétences techniques</h2>}
    <h2 className=" animate-fade-in text-2xl sm:text-3xl font-bold mb-6 border-b border-gray-700  pb-2 text-center sm:text-left">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 place-items-center">
      {items.map(({ src, label }, index) => (
        <div key={index} className="flex flex-col items-center transition-transform transform hover:scale-105">
          <img src={src} alt={label} className="w-16 sm:w-20 md:w-24 object-contain" />
          <p className=" text-sm text-center">{label}</p>
        </div>
      ))}
    </div>
  </div>
);

const Skills = () => {
  const languages = [
    { src: javaLogo, label: 'Java' },
    { src: pythonLogo, label: 'Python' },
    { src: CplusLogo, label: 'C++' },
    { src: SQLogo, label: 'SQL' },
    { src: matLabLogo, label: 'MATLAB' },
    { src: ocamLogo, label: 'OCaml' },
    { src: Nodejs, label: 'Node.js' },
  ];

  const titre = "compétences techniques" ; 

  const devopsTools = [
    { src: DockerLogo, label: 'Docker' },
    { src: Kubernetes, label: 'Kubernetes' },
    { src: AnsibleLogo, label: 'Ansible' },
    { src: JenkinsLogo, label: 'Jenkins' },
    { src: LocalStack, label: 'LocalStack' },
    { src: Oketeto, label: 'Okteto' },
    { src: ZUULogo, label: 'ZUUL-CI' },
    { src: AWS3Logo, label: 'AWS S3' },
    { src: VagrantLogo, label: 'Vagrant' },
  ];

  const frameworks = [
    { src: Reactjs, label: 'React JS' },
    { src: VueJs, label: 'Vue.js' },
    { src: DjangoLogo, label: 'Django' },
  ];

  const databases = [
    { src: MysqLogo, label: 'MySQL' },
    { src: mongoDbLogo, label: 'MongoDB' },
    { src: Neo4j, label: 'Neo4j' },
  ];

  return (
    <div>
      <div className="space-y-0">
        <Section title="Langages maîtrisés" items={languages} />
        <Section title="Outils DevOps" items={devopsTools} />
        <Section title="Frameworks Web" items={frameworks} />
        <Section title="Bases de données" items={databases} />
      </div>
    </div>
  );
};

export default Skills;
