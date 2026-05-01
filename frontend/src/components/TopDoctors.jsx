// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'


// const TopDoctors = () => {

//     const navigate = useNavigate()
//     const {doctors} = useContext(AppContext)

//   return (
//     <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
//         <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
//         <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
//         <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
//             {doctors.slice(0,10).map((item,index) => (
//             <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='border  border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '>
//                 <img className='bg-blue-50' src={item.image} alt=''/>
//                 <div className='p-4'>
//                     <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' :'text-gray-500'}`}>
//                         <p className={`w-2 h-2 ${item.available ? ' bg-green-500' : 'bg-gray-500'} rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
//                     </div>
//                     <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
//                     <p className='text-gray-600 textt-sm'>{item.speciality}</p>
//                 </div>
//             </div>

//             ))}
//         </div>
//         <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
//     </div>
//   )
// }

// export default TopDoctors


import React, { useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  //prevent unneccesary render 
  const topDoctors = useMemo(() => doctors.slice(0, 10), [doctors])

  const handleMoreDoctors = useCallback(() => {
    navigate("/doctors");
    window.scrollTo(0, 0);
  }, [navigate]);

  // Stable navigation function
  const handleNavigate = useCallback(
    (id) => {
      navigate(`/appointment/${id}`);
    },
    [navigate]
  );

  return (
    <section className="flex flex-col items-center my-20 px-4 sm:px-6 lg:px-12">

      {/* Heading */}
      <h1 className="text-3xl font-semibold text-gray-900 text-center">
        Top Doctors to Book
      </h1>

      <p className="text-sm text-gray-600 text-center mt-2 max-w-xl">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors Grid */}
      <div className="w-full mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

        {topDoctors.slice(0, 10).map((item) => (
          <div
            key={item._id}
            onClick={() => handleNavigate(item._id)}
            className="bg-white border border-blue-50 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-premium hover:border-primary/30 group"
          >

            {/* Image container */}
            <div className="w-full aspect-[4/5] bg-blue-50/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-3">

              <div
                className={`flex items-center gap-2 text-xs ${item.available ? "text-green-500" : "text-gray-500"
                  }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-400"
                    }`}
                ></span>

                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>

              <p className="text-sm font-semibold text-gray-900 mt-1">
                {item.name}
              </p>

              <p className="text-xs text-gray-600">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleMoreDoctors}
        className="mt-12 bg-blue-50 text-gray-700 px-10 py-3 rounded-full font-medium hover:bg-primary hover:text-white hover:shadow-premium transition-all duration-300 hover:-translate-y-1"
      >
        More
      </button>
    </section>
  );
};

export default React.memo(TopDoctors)

// import React, { useContext, useMemo, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const TopDoctors = () => {
//   const navigate = useNavigate();
//   const { doctors } = useContext(AppContext);

//   // Memoize sliced doctors (avoid recalculating every render)
//   const topDoctors = useMemo(() => doctors.slice(0, 10), [doctors]);

//   // Stable navigation function
//   const handleNavigate = useCallback(
//     (id) => {
//       navigate(`/appointment/${id}`);
//     },
//     [navigate]
//   );

//   const handleMoreDoctors = useCallback(() => {
//     navigate("/doctors");
//     window.scrollTo(0, 0);
//   }, [navigate]);

//   return (
//     <section className="flex flex-col items-center my-20 px-4 sm:px-6 lg:px-12">

//       {/* Heading */}
//       <h1 className="text-3xl font-semibold text-gray-900 text-center">
//         Top Doctors to Book
//       </h1>

//       <p className="text-sm text-gray-600 text-center mt-2 max-w-xl">
//         Simply browse through our extensive list of trusted doctors.
//       </p>

//       {/* Doctors Grid */}
//       <div className="w-full mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

//         {topDoctors.map((item) => (
//           <div
//             key={item._id}
//             onClick={() => handleNavigate(item._id)}
//             className="bg-white border border-blue-100 rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-md"
//           >

//             {/* Image */}
//             <div className="w-full aspect-[4/5] bg-blue-50 overflow-hidden">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 loading="lazy"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Content */}
//             <div className="p-3">

//               <div
//                 className={`flex items-center gap-2 text-xs ${
//                   item.available ? "text-green-500" : "text-gray-500"
//                 }`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     item.available ? "bg-green-500" : "bg-gray-400"
//                   }`}
//                 ></span>

//                 <p>{item.available ? "Available" : "Not Available"}</p>

//               </div>

//               <p className="text-sm font-semibold text-gray-900 mt-1">
//                 {item.name}
//               </p>

//               <p className="text-xs text-gray-600">
//                 {item.speciality}
//               </p>

//             </div>

//           </div>
//         ))}
//       </div>

//       {/* More Button */}
//       <button
//         onClick={handleMoreDoctors}
//         className="mt-12 bg-blue-50 text-gray-700 px-10 py-3 rounded-full hover:bg-blue-100 transition"
//       >
//         More
//       </button>

//     </section>
//   );
// };

// export default React.memo(TopDoctors);