import React, { useState } from 'react';
import SchedulerComponent from './SchedulerComponent';
import '../../src/cirlceAnimation.css';
import SchedulerComponent_ortools from './SchedulerComponent_ortools';
import CloudOptimizer from './CloudOptimizer';
const CircleCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOrtools , setIsOpenOrtools] = useState(false) ; 
  const [isFloating, setIsFloating] = useState(true);
  const [isFloatingOrtools, setIsFloatingOrtools] = useState(true);
  const handleOpen = () => {
    setIsOpen(true);
    setIsFloating(false);
  };

  const handleOrtoolsOpen = () => { 
    console.log("IS OPEN...") ; 
    setIsOpenOrtools(true);
    setIsFloatingOrtools(false);
  }

  const handleCloseOrtools = () => {
    setIsOpenOrtools(false);
    setIsFloatingOrtools(true);
  }
  const handleClose = () => {
    setIsOpen(false);
    setIsFloating(true);
  };

  return (
    <div className='bg-black text-gray-400 md:h-[150px] max-w-[1200px] mx-auto grid grid-cols-6 place-items-center md:flex md:justify-between md:items-center relative'> {/* Added relative */}
      <header className="pb-8">
      <h2 className='text-gray-700 text-2xl md:text-3xl font-bold m-4 primary-color'>
        Portail API 
      </h2>
      </header>
      <div className="relative  flex flex-auto space-x-4 justify-center"> {/* Positioning context */}
        {/* Circle Card */}

        <div className={`w-30 h-30 bg-blue-400 rounded-full flex items-center justify-center 
                      shadow-lg shadow-blue-500/50 cursor-pointer px-4 py-2 hover:bg-blue-600 
                      hover:scale-105 transition-transform ${
                        isFloating ? 'animate-discrete-float' : ''
                      }`}
          onClick={handleOpen}
        >
          <span className="text-white text-center  font-bold text-base">
            Microservice Deployment Optimizer
          </span>
        </div>

         {/* Popup Modal */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center mt-40 justify-center z-[9999]  bg-black bg-opacity-50">
              <div className="bg-white rounded-lg mt-40 shadow-xl p-6 w-[800px] relative">
                <button
                  className="absolute top-3 right-3 hover:text-black focus:outline-none text-lg font-bold"
                  onClick={handleClose}
                  aria-label="Close Modal"
                >
                  ✖
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">
                  Scheduler Component
                </h2>
                <div>
                  <CloudOptimizer />
                </div>
              </div>
            </div>
          )}
        {/* <div
          className={`w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform ${
            isFloatingOrtools ? 'animate-float' : ''
          }`}
          onClick={handleOrtoolsOpen}
         >
              <span className="text-white text-center font-bold text-xs">Task Scheduler ortools</span>
        </div> */}
        {
          isOpenOrtools && (
            <div className="absolute top-full left-0 mt-4 z-[9999] w-full min-w-[400px]"> {/* Changed positioning */}
            <div className="bg-white rounded-lg shadow-xl p-6 relative">
              <button
                className="absolute top-3 right-3 hover:text-black focus:outline-none text-lg font-bold"
                onClick={handleCloseOrtools}
                aria-label="Close Modal"
              >
                ✖
              </button>
              {/* <div>
                <h2 className="text-xl font-bold mb-4 text-center">
                  Scheduler Component
                </h2>
                <div>
                  <SchedulerComponent_ortools />
                </div>
              </div> */}
            </div>
          </div>
          )
        }
      </div>
      {/* Task scheduler with ortools  */}
      
    </div>
  );
};

export default CircleCard;