// import React from 'react'
// import { useContext } from 'react'
// import { AdminContext } from '../../context/AdminContext'
// import { useEffect } from 'react'
// import { AppContext } from '../../context/AppContext'
// import { assets } from '../../../../admin/src/assets/assets'

// const AllAppointments = () => {
//   const {aToken, appointments,getAllAppointments,cancelAppointment} = useContext(AdminContext)
//   const {calculateAge,slotDateFormat,currency} = useContext(AppContext)
//   useEffect(()=>{
//     if(aToken){
//       getAllAppointments()
//     }
//   },[aToken])
//   return (
//     <div className='w-full max-w-6xl m-5'>
//       <p className='mb-3 text-lg font-medium'>All Appointments</p>
//       <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
//         <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>ees</p>
//           <p>Actions</p>
//         </div>

//         {appointments.map((item,index)=>(
//           <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 px-6 py-3 border-b hover:bg-gray-50 ' key={index}>
//             <p className='max-sm:hidden'>{index+1}</p>
//             <div className='flex items-center gap-2'>
//               <img className='w-8 rounded-full' src={item.userData.image} alt=''/> <p>{item.userData.name}</p>
//               </div>
//               <p className='max-sm:hidden'>{calculateAge(item.userData)}</p>
//               <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
//                 <div className='flex items-center gap-2'>
//               <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt=''/> <p>{item.docData.name}</p>
//               </div>
//               <p>{currency} {item.amount}</p>
//               {item.cancelled 
//               ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//               : item.isCompleted
//                 ?<p className='text-green-500 text-xs font-medium'>Completed</p> 
//                :<img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt=''/>
//             }
              
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default AllAppointments

import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../../../admin/src/assets/assets'

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  // 🔥 fetch only when needed
  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken, getAllAppointments])

  // 🔥 memoized cancel handler
  const handleCancel = useCallback((id) => {
    cancelAppointment(id)
  }, [cancelAppointment])

  // 🔥 safe list rendering
  const renderedAppointments = useMemo(() => {
    return appointments?.map((item, index) => {

      const patient = item.userData || {}
      const doctor = item.docData || {}

      return (
        <div
          key={item._id || index}
          className='flex flex-col sm:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] gap-2 sm:gap-0 items-start sm:items-center text-gray-600 px-4 sm:px-6 py-3 border-b hover:bg-gray-50 transition'
        >

          {/* Index */}
          <p className='hidden sm:block'>{index + 1}</p>

          {/* Patient */}
          <div className='flex items-center gap-2'>
            <img
              className='w-8 h-8 rounded-full object-cover'
              src={patient.image}
              alt=''
            />
            <p className='text-sm font-medium'>{patient.name}</p>
          </div>

          {/* Age */}
          <p className='hidden sm:block'>{calculateAge(patient)}</p>

          {/* Date */}
          <p className='text-xs sm:text-sm'>
            {slotDateFormat(item.slotDate)}, {item.slotTime}
          </p>

          {/* Doctor */}
          <div className='flex items-center gap-2'>
            <img
              className='w-8 h-8 rounded-full bg-gray-200 object-cover'
              src={doctor.image}
              alt=''
            />
            <p className='text-sm'>{doctor.name}</p>
          </div>

          {/* Fees */}
          <p className='text-sm font-medium'>
            {currency} {item.amount}
          </p>

          {/* Status / Action */}
          <div>
            {item.cancelled ? (
              <p className='text-red-500 text-xs font-semibold'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-500 text-xs font-semibold'>Completed</p>
            ) : (
              <img
                onClick={() => handleCancel(item._id)}
                className='w-8 sm:w-9 cursor-pointer hover:scale-110 transition'
                src={assets.cancel_icon}
                alt='cancel'
              />
            )}
          </div>

        </div>
      )
    })
  }, [appointments, calculateAge, slotDateFormat, currency, handleCancel])

  return (
    <div className='w-full px-2 sm:px-4 md:px-6 py-4'>

      <div className='max-w-6xl mx-auto'>
        <h2 className='text-lg sm:text-xl font-semibold mb-4'>
          All Appointments
        </h2>

        <div className='bg-white border rounded-xl shadow-sm overflow-hidden'>

          {/* Header */}
          <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] py-3 px-6 border-b text-gray-700 font-medium text-sm bg-gray-50'>
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>

          {/* List */}
          <div className='max-h-[75vh] overflow-y-auto'>
            {appointments?.length > 0 ? (
              renderedAppointments
            ) : (
              <p className='text-center text-gray-400 py-10'>
                No Appointments Found
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default React.memo(AllAppointments)