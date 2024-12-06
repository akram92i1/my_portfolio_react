import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import navbarlogo from '../assets/navbarlogo.png'
const Hero = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-[1200px] md:h-[70vh] mx-auto py-8 bg-black'>
            <div className='col-span-1 my-auto mx-auto w-[300px] h-auto lg:w-[400px]'>
                <img src={navbarlogo} alt="akram image" />
            </div>
            <div className='col-span-2 px-5 my-auto'>
    <h1 className='primary-color text-xl sm:text-2xl lg:text-3xl font-extrabold'>
        <span className='primary-color'>
            Je suis 
        </span>
        <br />  
        <TypeAnimation 
            sequence={[
                "concepteur et développeur d'application pour des problèmes d'optimisation",
                1000,
                "développeur fullstack d'applications web",
                1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
        />
    </h1>
    <p className='text-white sm:text-lg my-6  lg:text-xl'>
    Je m'appelle Akram KHELILI, diplômé d'une maîtrise en informatique à l'UQAM et d'un master en technologies de l'information. Avec deux ans d'expérience en développement d'applications web, je me spécialise dans la conception de solutions web innovantes pour résoudre des problèmes complexes d'optimisation et de recherche. Passionné par les approches intelligentes, j'aime appliquer des méthodes heuristiques et d'apprentissage par renforcement pour développer des solutions efficaces et adaptées aux problématiques du monde réel.
    </p>
    <div className='my-8'>
        <a href="/" className='px-6 py-3 w-full rounded-xl mr-4  bg-gradient-to-br from-orange-500 to-pink-500 text-white'>
        Telecharger CV
        </a>
        <a href="#contact" className='px-6 py-3 w-full rounded-xl mr-4  bg-gradient-to-br from-gray-500 to-pink-500 text-white'>
        Contacter moi
        </a>
    </div>
</div>

    </div>
  )
}

export default Hero
