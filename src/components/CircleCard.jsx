import React, { useState } from 'react';
import SchedulerComponent from './SchedulerComponent';
import '../../src/cirlceAnimation.css';

const CircleCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFloating, setIsFloating] = useState(true);

  const handleOpen = () => {
    setIsOpen(true);
    setIsFloating(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsFloating(true);
  };

  return (
    <div className='border border-gray-600 bg-black text-gray-400 md:h-[150px] max-w-[1200px] mx-auto grid grid-cols-6 place-items-center md:flex md:justify-between md:items-center relative'> {/* Added relative */}
      <h2 className='text-gray-700 text-2xl md:text-3xl font-bold m-4'>
        Portail <br /> API 
      </h2>
      
      <div className="relative"> {/* Positioning context */}
        {/* Circle Card */}
        <div
          className={`w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform ${
            isFloating ? 'animate-float' : ''
          }`}
          onClick={handleOpen}
        >
          <span className="text-white text-center font-bold text-xs">Task Scheduler</span>
        </div>

        {/* Popup Modal */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-4 z-[9999] w-full min-w-[400px]"> {/* Changed positioning */}
            <div className="bg-white rounded-lg shadow-xl p-6 relative">
              <button
                className="absolute top-3 right-3 hover:text-black focus:outline-none text-lg font-bold"
                onClick={handleClose}
                aria-label="Close Modal"
              >
                ✖
              </button>
              <div>
                <h2 className="text-xl font-bold mb-4 text-center">
                  Scheduler Component
                </h2>
                <div>
                  <SchedulerComponent />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircleCard;