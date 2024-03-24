import React, { useState, useEffect } from 'react';
import intro from "../assets/main.PNG"
import trash from "../assets/trash-bin.png"
import garbage from "../assets/garbage-bag.png"
import dump from "../assets/dumpster-fire.png"
import arrow from "../assets/arrow-right.png"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { NavBar } from './Navbar';

function IntroPage() {
  const [animationIndex, setAnimationIndex] = useState(0);
  const words = ["Upload,", "track,", "optimize,"];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); // Change the interval duration as needed

    return () => clearInterval(interval);
  }, []);

  const content = [
    { id: 1,  icon: trash, title: 'Garbage Pickup for Home', description: 'Residential Recycling is available in many areas where we offer garbage pickup.' },
    { id: 2, icon: garbage, title: 'Business Waste', description: 'Our Commercial Waste Collection service provides your business with a range of dumpsters and service schedules to meet your needs.' },
    { id: 3, icon: dump, title: 'Dumpster Rental', description: 'Our Roll Off Dumpster services offer a range of container sizes suitable for commercial, residential, and construction needs.' },
  ];

  const responsiveItems = [
    { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    { breakpoint: { max: 1024, min: 768 }, items: 2 },
    { breakpoint: { max: 768, min: 0 }, items: 1 },
  ];

  return (
    <>
    <NavBar/>
    <div className='relative bg-white'>
  <div className="container mx-auto grid grid-cols-2">
    <div className="col-span-1 flex flex-col justify-center items-center text-center font-protest-riot text-gray-800">
      <h1 className="text-4xl">The Waste Management tool designed to help your business comply.</h1>
      <p className="text-xl mt-4"> {words.slice(0, animationIndex + 1).join(' ')} comply with just a few clicks <span className="opacity-0"> {words[animationIndex]}</span> </p>
      <div className="mt-8">
        <Link to='/login'>
        <button className="bg-green-800 text-white px-8 py-2 rounded-md hover:shadow-lg mr-10"> Staff Login</button></Link>
        <Link to='/login'><button className="bg-green-800 text-white px-8 py-2 rounded-md hover:shadow-lg">Manager Login</button></Link>
      </div>
    </div>
    <div className="col-span-1">
      <img src={intro} alt='hero-image' className='min-h-screen border-none' />
    </div>
  </div>
</div>
<div className="flex overflow-x-auto gap-4">
  {content.map((item) => (
    <div
      key={item.id} // Add a unique key for each item
      className={`w-full cursor-pointer bg-white rounded-2xl mt-4 mb-4 shadow-md px-4 py-6 flex flex-col items-start justify-between border border-gray-200 hover:border-green-500 transition-colors duration-300 hover:transform hover:-translate-y-1`}
    >
      <div className="flex items-center gap-2">
        <img
          className="w-20 h-20 object-cover rounded-md" // Reduced size and added full border radius
          src={item.icon}
          alt={item.title}
        />
        <h3 className="text-lg font-bold text-center">{item.title}</h3>
      </div>
      <p className="text-base opacity-75 my-2">{item.description}</p>
      <div className="relative left-2/4"> {/* Separate container for right alignment */}
      <svg className="h-7 w-7 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
</svg>

      </div>
    </div>
  ))}
</div>

</>
  
  
  );
}

export default IntroPage;
