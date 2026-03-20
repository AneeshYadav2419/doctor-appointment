// import React from 'react'
// import { useContext } from 'react'
// import { AdminContext } from '../../context/AdminContext'
// import { useEffect } from 'react'

// const DoctorsList = () => {

//   const { doctors, aToken, getAllDoctors, changeAvailability} = useContext(AdminContext)

//   useEffect(() => {
//     if(aToken) {
//       getAllDoctors()
//     }
//   },[aToken])
//   return (
//     <div className='m-5 max-h-[90vh] overflow-y-scroll'>
//       <h1 className='text-lg font-medium'>All Doctors</h1>
//       <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
//         {
//           doctors.map((item, index)=> (
//             <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
//               <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt=''/>
//               <div className='p-4'>
//                 <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
//                 <p className='text-zinc-600 text-sm'>{item.speciality}</p>
//                 <div className='mt-2 flex items-center gap-1 text-sm'>
//                   <input onChange={()=>changeAvailability(item._id)} type='checkbox' checked={item.available}/>
//                   <p>Available</p>
//                   </div>
//               </div>

//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default DoctorsList

import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  // 🔥 fetch doctors
  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken, getAllDoctors])

  // 🔥 stable handler
  const handleAvailability = useCallback((id) => {
    changeAvailability(id)
  }, [changeAvailability])

  // 🔥 memo render list
  const renderedDoctors = useMemo(() => {
    return doctors?.map((item) => (
<div
  key={item._id}
  className='bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col'
>

  {/* Image */}
  <div className='overflow-hidden'>
    <img
      className='w-full h-52 sm:h-56 object-cover group-hover:scale-105 transition duration-500'
      src={item.image}
      alt={item.name}
    />
  </div>

  {/* Content */}
  <div className='p-4 flex flex-col justify-between flex-1'>

    <div>
      <p className='text-gray-800 text-lg font-semibold'>
        {item.name}
      </p>
      <p className='text-gray-500 text-sm mt-1'>
        {item.speciality}
      </p>
    </div>

    {/* Availability */}
    <div className='mt-4 flex items-center justify-between'>
      <span className={`text-xs font-medium px-2 py-1 rounded-full 
        ${item.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
        {item.available ? 'Available' : 'Not Available'}
      </span>

      <input
        type='checkbox'
        checked={item.available}
        onChange={() => handleAvailability(item._id)}
        className='cursor-pointer'
      />
    </div>

  </div>
</div>
    ))
  }, [doctors, handleAvailability])

  return (
    <div className='w-full px-3 sm:px-5 md:px-8 py-4'>

      <div className='max-w-7xl mx-auto'>

        <h1 className='text-lg sm:text-xl font-semibold mb-4'>
          All Doctors
        </h1>

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

          {doctors?.length > 0 ? (
            renderedDoctors
          ) : (
            <p className='text-gray-400 text-center col-span-full'>
              No Doctors Found
            </p>
          )}

        </div>

      </div>
    </div>
  )
}

export default React.memo(DoctorsList)