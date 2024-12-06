import React from 'react'
import akram from '../assets/pikaso_image.jpg'
const About = () => {
  return (
    <div className='text-white max-w-[1200px] mx-auto' id='about'>
      <div className='md:grid md:grid-cols-2 sm:py-16'>
        <div className='mt-4 md:mt-0 text-left  flex '>
            <div className='my-auto mx-6 '>
                <h2 className='text-4xl font-bold mb-4 primary-color'>À propos de moi</h2>
                <p className='text-base lg:text-lg '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus minus dolorum ipsam, qui unde tempore aspernatur veniam ducimus consequatur necessitatibus odio ea aut doloremque, similique ab odit ex nemo explicabo!</p>

            </div>
        </div>
        <img className='mx-auto rounded-3xl py-8 md:py-0' width={300} height={300} src={akram} alt="" />
      </div>
    </div>
  )
}

export default About
