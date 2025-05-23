import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import navbarlogo from '../assets/navbarlogo.png';
import cvFile from "../assets/AkramCV.pdf";
import { FaWhatsapp, FaLinkedin, FaEnvelope } from 'react-icons/fa';
const Hero = () => {
  const [contactModal, setContactModal] = useState(false);

  const ContactModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 hover:backdrop-blur-sm">
  <div className="bg-gray-800 rounded-lg p-8 w-[10vw] h-[10vh] min-w-[300px] min-h-[350px] flex flex-col justify-center items-center relative">
    <button 
      onClick={() => setContactModal(false)}
      className="absolute top-2 right-2 text-white hover:text-pink-500 text-2xl"
    >
      &times;
    </button>

    <h3 className="text-white text-xl  mb-4">Contact Rapide</h3>

    <div className="flex flex-col gap-4 w-full px-2">
      <a
        href="https://wa.me/+14389254652"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <FaWhatsapp size={30} />
        <span>WhatsApp</span>
      </a>

      <a
        href="https://www.linkedin.com/in/akram-khelili-727030191/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <FaLinkedin size={30} />
        <span>LinkedIn</span>
      </a>

      <a
        href="mailto:akramkhelili9300429@gmail.com"
        className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <FaEnvelope size={30} />
        <span>Gmail</span>
      </a>
    </div>
  </div>
</div>
  );

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-[1200px] md:h-[70vh] mx-auto py-8 bg-black'>
      {contactModal && <ContactModal />}
      
      <div className='col-span-1 my-auto mx-auto w-[300px] h-auto lg:w-[400px]'>
         <img className=' animate-fade-in rounded-3xl w-48 sm:w-56 lg:w-64  mx-auto mb-6' src={navbarlogo} alt="akram image" />
      </div>
      
      <div className='col-span-2 px-5 my-auto'>
        <h1 className='primary-color text-xl sm:text-2xl lg:text-3xl font-extrabold'>
          <span className='primary-color'>Je suis </span>
          <br />  
          <TypeAnimation 
            sequence={[
              "développeur d'application pour des problèmes d'optimisation",
              1000,
              "développeur fullstack d'applications web",
              1000,
              "Ingénieur DevOps "
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        
        <p className='text-white sm:text-lg my-6 lg:text-xl'>
          Je m'appelle Akram KHELILI, diplômé d'une maîtrise en informatique à l'UQAM et d'un master en technologies de l'information. 
          Avec deux ans d'expérience en développement web et deux ans comme chercheur à plein temps, je me spécialise dans la conception de 
          solutions innovantes en combinant expertise technique et réflexion analytique.
        </p>
        
        <div className='my-8 flex gap-4'>
          <a 
            href={cvFile} 
            download="Akram_Khelili_CV.pdf" 
            className='px-6 py-3 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 text-white hover:opacity-90 transition-opacity flex-1 text-center'
          >
            Télécharger CV
          </a>
          
          <button 
            onClick={() => setContactModal(true)}
            className='px-6 py-3 rounded-xl bg-gradient-to-br from-gray-500 to-pink-500 text-white hover:opacity-90 transition-opacity flex-1'
          >
            Contacter moi
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;