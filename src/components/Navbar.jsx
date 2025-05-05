import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-scroll';
function Navbar() {
    const [nav,setNav] = useState(false) ; 

    const handleNav = () => {
        setNav(!nav) ; 
    }

  return (
    <div className='bg-black h-[100px] text-gray-400 max-w-[1200px] mx-auto flex justify-between items-center'>
    <h1 className='text-3xl font-bold primary-color ml-4'>Akram KHELILI</h1>
    <ul className='hidden md:flex'>
        <li className='p-5'>
            <Link to="about" smooth={true} duration={500} className=" animate-fade-in  cursor-pointer">
                À propos de moi
            </Link>
        </li>
        <li className='p-5'>
            <Link to="work" smooth={true} duration={500} className=" animate-fade-in  cursor-pointer">
                Mes travaux
            </Link>
        </li>
        <li className='p-5'>
            <Link to="portailAPI" smooth={true} duration={500} className=" animate-fade-in  cursor-pointer">
                 Portail API 
            </Link>
        </li>
    </ul>
    <div onClick={handleNav} className='block md:hidden mr-6'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
    </div>

    {/* For phone navigation */}
    <div className={nav ? 'fixed h-full left-0 top-0 w-[60%] bg-[#202121] ease-in-out duration-500' : 'fixed left-[-100%]'}>
        <h1 className='animate-fade-in text-3xl primary-color m-4 '>Akram KHELILI</h1>
        <ul className='p-8 text-2xl'>
            <li className='p-2'>
                <Link to="home" smooth={true} duration={500} className="cursor-pointer" onClick={handleNav}>
                     À propos de moi
                </Link>
            </li>
            <li className='p-2'>
                <Link to="about" smooth={true} duration={500} className="cursor-pointer" onClick={handleNav}>
                      Mes travaux
                </Link>
            </li>
            <li className='p-2'>
                <Link to="work" smooth={true} duration={500} className="cursor-pointer" onClick={handleNav}>
                    Portail API 
                </Link>
            </li>
            <li className='p-2'>
                <Link to="contact" smooth={true} duration={500} className="cursor-pointer" onClick={handleNav}>
                    Contact
                </Link>
            </li>
        </ul>
    </div>
</div>
  )
}

export default Navbar