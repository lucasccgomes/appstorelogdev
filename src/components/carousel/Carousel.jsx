/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


import CarouselItem from './CarouselItem';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({ items, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    const index = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const index = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  useEffect(() => {
    const autoPlay = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(autoPlay);
  }, [currentIndex, interval]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <CarouselItem {...item} />
          </div>
        ))}
      </div>
      <button
        onClick={previousSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-4 dark:bg-white ml-1 bg-gray-700 text-white dark:text-gray-700 rounded-full focus:outline-none"
      >
      <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-4 dark:bg-white mr-1 bg-gray-700 text-white dark:text-gray-700 rounded-full focus:outline-none"
      >
        <FaChevronRight/>
      </button>
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  interval: PropTypes.number,
};

export default Carousel;
