import React from 'react'
import projetMaitrise from '../assets/ReaserachPaper.webp' 
import projetLicence from '../assets/projetLicence.webp'
const Work = () => {
  return (
    <div className='max-w-[1200px] mx-auto p-5' id='work'>
      <div className='pb-8 text-left'>
        <p className='text-4xl mb-3 font-bold primary-color'>Mes traveaux</p>
        <p className='text-gray-400'>Explorez mes récents projets</p>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
      <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div h-[300px] md:h-[350px] lg:h-[400px] bg-cover relative'>
        <img src={projetMaitrise} alt="" layout="fill" objectFit="cover"/>
        <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
          <a href="/">
            <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
              Direct
            </button>
          </a>
        </div>
      </div>
      <div className='transform transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div h-[300px] md:h-[350px] lg:h-[400px] bg-cover relative'>
        <img src={projetLicence} alt="" layout="fill" objectFit="cover"/>
        <div className='opacity-0 group-hover:opacity-90 bg-[gray]/70 absolute inset-0 flex flex-col justify-center items-center'>
          <a href="/">
            <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
              Direct
            </button>
          </a>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Work
