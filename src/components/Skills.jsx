import React from 'react'
import javaLogo from '../assets/java.png' ; 
import pythonLogo from '../assets/Python.png' ; 
import jsLogo from '../assets/Javascript.png'; 
import CplusLogo from '../assets/Cplus.png'; 
import SQLogo from '../assets/SQL.png' ; 
import ocamLogo from '../assets/Ocaml.png'
import matLabLogo from '../assets/Matlab.png'
const Skills = () => {
  return (
    <div className='border border-gray-600 bg-black text-gray-400 md:h-[150px] max-w-[1200px] mx-auto grid grid-cols-6 place-items-center 
            md:flex md:justify-between md:items-center'>
            <h2 className='text-gray-700 text-2xl md:text-4xl font-bold m-4 '>
                Langages  <br /> maîtrisés

            </h2>
       
        <div className='flex flex-col items-center m-4 sm:my-0 w-[80px] md:w[100px]'>
            <img src={javaLogo} alt="" width={100} height={100} />
            <p className='mt-2'>Java</p>
        </div>

        <div className='flex flex-col items-center m-4 sm:my-0 w-[80px] md:w[100px]'>
            <img src={pythonLogo} alt="" width={100} height={100} />
            <p className='mt-2'>Python</p>
        </div>

        <div className='flex flex-col items-center m-4 sm:my-0 w-[80px] md:w[100px]'>
            <img src={CplusLogo} alt="" width={100} height={100} />
            <p className='mt-2'>C++</p>
        </div>

        <div className='flex flex-col items-center m-4 sm:my-0 w-[80px] md:w[100px]'>
            <img src={SQLogo} alt="" width={100} height={100} />
            <p className='mt-2'>SQL</p>
        </div>


        <div className='flex flex-col items-center m-4 sm:my-0 w-[80px] md:w[100px]'>
            <img src={matLabLogo} alt="" width={100} height={100} />
            <p className='mt-2'>MATLAB</p>
        </div>

        <div className='flex flex-col items-center m-4 sm:my-0 w-[80px] md:w[100px]'>
            <img src={ocamLogo} alt="" width={100} height={100} />
            <p className='mt-2'>OCaml</p>
        </div>

        <div className='flex flex-col items-center m-4 sm:my-0 w-[80px] md:w[100px]'>
            <img src={jsLogo} alt="" width={100} height={100} />
            <p className='mt-2'>Javascript</p>
        </div>


    </div>
  )
}
export default Skills
 