import React from 'react'
import javaLogo from '../assets/java.png' ; 
import pythonLogo from '../assets/Python.png' ; 
import VueJs from '../assets/Vuejs.png' ; 
import CplusLogo from '../assets/Cplus.png'; 
import SQLogo from '../assets/SQL.png' ; 
import ocamLogo from '../assets/Ocaml.png';
import matLabLogo from '../assets/Matlab.png' ;
import DockerLogo from '../assets/Docker.png' ; 
import AnsibleLogo from '../assets/Ansible.png' ; 
import JenkinsLogo from '../assets/Jenkins.png';
import Kubernetes from '../assets/Kubernetes.png';
import LocalStack from '../assets/Localstack.png';
import Oketeto from "../assets/Okteto.png";
import ZUULogo from "../assets/ZUUL.png";
import AWS3Logo from '../assets/AWS3.png';
import VagrantLogo from '../assets/Vagrant.png'
import MysqLogo from  '../assets/MYSQL.png';
import mongoDbLogo from '../assets/mongodb.png';
import Neo4j from '../assets/Neo4j.png';
import Reactjs from '../assets/react.png';
import Nodejs from '../assets/nodejs.png';
import DjangoLogo from '../assets/Django.png'
const Skills = () => {
  return (
    <div>
        <div className='border border-white border-dashed bg-black text-gray-400 max-w-[1200px] mx-auto grid grid-cols-2 gap-4 place-items-center 
            sm:grid-cols-3 md:grid-cols-6 md:h-[150px] md:flex md:justify-between md:items-center'>
                <h2 className='text-gray-750 text-2xl md:text-3xl font-bold m-4 '>
                    Langages  <br /> maîtrisés

                </h2>
        
            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
                <img src={javaLogo} alt="" width={75} height={75} />
                <p className='mt-2'>Java</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
                <img src={pythonLogo} alt="" width={75} height={75} />
                <p className='mt-2'>Python</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
                <img src={CplusLogo} alt="" width={75} height={75} />
                <p className='mt-2'>C++</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
                <img src={SQLogo} alt="" width={75} height={75} />
                <p className='mt-2'>SQL</p>
            </div>


            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
                <img src={matLabLogo} alt="" width={75} height={75} />
                <p className='mt-5'>MATLAB</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
                <img src={ocamLogo} alt="" width={75} height={75} />
                <p className='mt-2'>OCaml</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
                <img src={Nodejs} alt="" width={75} height={75} />
                <p className='mt-2'>Nodejs</p>
            </div>
    

        </div>

        <div className='border border-white border-dashed bg-black text-gray-400 max-w-[1200px] mx-auto grid grid-cols-2 gap-4 place-items-center 
            sm:grid-cols-3 md:grid-cols-6 md:h-[150px] md:flex md:justify-between md:items-center' >
            <h2 className='text-gray-750 text-2xl md:text-3xl font-bold m-4 '> 
            Outils  <br /> Devops
            </h2>
            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={DockerLogo} alt="" width={75} height={75} />
              <p className='mt-2'>Docker</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={Kubernetes} alt="" width={75} height={75} />
              <p className='mt-2'>Kubernetes</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={AnsibleLogo} alt="" width={75} height={75} />
              <p className='mt-2'>Ansible</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={JenkinsLogo} alt="" width={62} height={62} />
              <p className='mt-2'>Jenkins</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={LocalStack} alt="" width={75} height={75} />
              <p className='mt-2'>LocalStack</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={Oketeto} alt="" width={80} height={80} />
              <p className='mt-2'>Oketeto</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={ZUULogo} alt="" width={100} height={100} />
              <p className='mt-2'>ZUUL-CI</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={AWS3Logo} alt="" width={100} height={100} />
              <p className='mt-2'>AWS S3</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={VagrantLogo} alt="" width={100} height={100} />
              <p className='mt-2'>Vagrant</p>
            </div>
        </div>



        <div className='border border-white border-dashed bg-black text-gray-400 max-w-[1200px] mx-auto grid grid-cols-2 gap-4 place-items-center 
            sm:grid-cols-3 md:grid-cols-6 md:h-[150px] md:flex md:justify-items-start md:items-center' >

              <h2 className='text-gray-750 text-2xl md:text-3xl font-bold m-4'> 
                    Framework<br /> WEB
              </h2>
              <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={Reactjs} alt="" width={100} height={100} />
              <p className='mt-2'>React Js</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={VueJs} alt="" width={100} height={100} />
              <p className='mt-2'>Vue.Js</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={DjangoLogo} alt="" width={100} height={100} />
              <p className='mt-2'>django</p>
            </div>
        </div>

        <div className='border border-white border-dashed bg-black text-gray-400 max-w-[1200px] mx-auto grid grid-cols-2 gap-4 place-items-center 
            sm:grid-cols-3 md:grid-cols-6 md:h-[150px] md:flex md:justify-items-start md:items-center' >

            <h2 className='text-gray-750 text-2xl md:text-3xl font-bold m-4 ml-1 sm:text-3xl'> 
                        Base de  <br /> données
              </h2>

             <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={MysqLogo} alt="" width={100} height={100} />
              <p className='mt-2'>My SQL</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={mongoDbLogo} alt="" width={100} height={100} />
              <p className='mt-2'>mongo db</p>
            </div>

            <div className='flex flex-col items-center m-4 sm:my-0 w-[75px] md:w-[75px]'>
            <img src={Neo4j} alt="" width={100} height={100} />
              <p className='mt-2'>Neo4j</p>
            </div>
          </div>


          
          
    </div>
  )
}
export default Skills
 