// import React from 'react'
// import { specialityData } from '../assets/assets'
// import { Link } from 'react-router-dom'

// const SpecialityMenu = () => {
//   return (
//     <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
//         <h1 className='text-3xl font-medium'>Find by Speciality</h1>
//         <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
//         <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
//             {specialityData.map((item,index)=>( 
//                 <Link onClick={() => scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px]
//                 transition-all duration-500 '
//                  key={index} to={`/doctors/${item.speciality}`}>
//                     <img className="w-16 sm:w-24 mb-2" src={item.image} alt=''/>
//                     <p>{item.speciality}</p>
//                 </Link>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default SpecialityMenu

import React, { useCallback, useMemo } from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const specialityList = useMemo(() => {
    return specialityData.map((item) => (
      <Link
        key={item.speciality}
        to={`/doctors/${item.speciality}`}
        onClick={handleScrollTop}
        className="flex flex-col items-center text-xs sm:text-sm cursor-pointer flex-shrink-0 group
        transition-all duration-300 ease-out hover:-translate-y-3"
      >
        {/* Icon container */}
        <div
          className="bg-gray-50 p-4 rounded-full shadow-sm border border-gray-100
          transition-all duration-500 ease-out
          group-hover:shadow-premium group-hover:scale-110 group-hover:border-primary/20 group-hover:bg-blue-50/50"
        >
          <img
            className="w-14 sm:w-20 object-contain"
            src={item.image}
            alt={item.speciality}
            loading="lazy"
          />
        </div>

        {/* Speciality Name */}
        <p
          className="mt-2 font-medium text-gray-700
          transition-colors duration-300 ease-out
          group-hover:text-primary"
        >
          {item.speciality}
        </p>
      </Link>
    ));
  }, [handleScrollTop]);

  return (
    <section
      id="speciality"
      className="flex flex-col items-center gap-6 py-16 px-4 text-gray-800"
    >
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-semibold text-center">
        Find by Speciality
      </h1>

      {/* Description */}
      <p className="text-sm md:text-base text-center max-w-xl text-gray-600">
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      {/* Speciality List */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex sm:justify-center gap-6 pt-6 min-w-max">
          {specialityList}
        </div>
      </div>
    </section>
  );
};

export default React.memo(SpecialityMenu);