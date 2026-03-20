// import React from 'react'
// import { useContext } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import { useEffect } from 'react'
// import { assets } from '../../assets/assets'
// import { AppContext } from '../../context/AppContext'

// const DoctorDashboard = () => {
//   const { dashData, setDashData, getDashData, dToken,cancelAppointment,completeAppointment } = useContext(DoctorContext)
//   const { currency, slotDateFormat } = useContext(AppContext)

//   useEffect(() => {
//     if (dToken) {
//       getDashData()
//     }
//   }, [dToken])
//   return dashData && (
//     <div className='m-5'>
//       <div className='flex flex-wrap gap-3'>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.earning_icon} alt='' />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{currency}{dashData.earnings}</p>
//             <p className='text-gray-400'>Earnings</p>
//           </div>
//         </div>

//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.appointment_icon} alt='' />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
//             <p className='text-gray-400'>Appointments</p>
//           </div>
//         </div>

//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.patients_icon} alt='' />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
//             <p className='text-gray-400'>Patients</p>
//           </div>
//         </div>

//       </div>
//       <div className='bg-white'>
//         <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
//           <img src={assets.list_icon} alt='' />
//           <p className='font-semibold'>Latest Booking</p>

//         </div>
//         <div className='pt-4 border border-t-0'>
//           {
//             dashData.latestAppointments.map((item, index) => (
//               <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
//                 <img className='rounded-full w-10' src={item.userData.image} alt='' />
//                 <div className='flex-1 text-sm'>
//                   <p className='text-gray-800 font-medium'>{item.userData.name}</p>
//                   <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
//                 </div>
//                 {
//                   item.cancelled
//                     ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                     : item.isCompleted
//                       ? <p className='text-green-500 text-xs font-medium'>Completed</p>
//                       : <div className='flex'>
//                         <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt='' />
//                         <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt='' />
//                       </div>
//                 }
//               </div>
//             ))
//           }

//         </div>
//       </div>


//     </div>
//   )
// }

// export default DoctorDashboard

import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {

  const { dashData, getDashData, dToken, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) getDashData()
  }, [dToken])

  if (!dashData) return null

  return (
    <div className='p-4 sm:p-6'>

      {/* 🔥 Top Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

        <div className='flex items-center gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all'>
          <img className='w-12' src={assets.earning_icon} alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-700'>
              {currency}{dashData.earnings}
            </p>
            <p className='text-gray-400 text-sm'>Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all'>
          <img className='w-12' src={assets.appointment_icon} alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-700'>
              {dashData.appointments}
            </p>
            <p className='text-gray-400 text-sm'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all'>
          <img className='w-12' src={assets.patients_icon} alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-700'>
              {dashData.patients}
            </p>
            <p className='text-gray-400 text-sm'>Patients</p>
          </div>
        </div>

      </div>

      {/* 🔥 Latest Appointments */}
      <div className='mt-8 bg-white rounded-xl border shadow-sm'>

        {/* Header */}
        <div className='flex items-center gap-2 px-4 py-4 border-b'>
          <img src={assets.list_icon} alt='' />
          <p className='font-semibold text-gray-700'>Latest Bookings</p>
        </div>

        {/* List */}
        <div className='divide-y'>

          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 transition-all'
            >

              {/* Left */}
              <div className='flex items-center gap-3'>
                <img
                  className='w-10 h-10 rounded-full object-cover'
                  src={item.userData.image}
                  alt=''
                />
                <div>
                  <p className='text-gray-800 font-medium text-sm sm:text-base'>
                    {item.userData.name}
                  </p>
                  <p className='text-gray-500 text-xs'>
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
              </div>

              {/* Right Actions */}
              <div className='flex items-center gap-2'>

                {item.cancelled ? (
                  <span className='text-red-400 text-xs font-medium'>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='text-green-500 text-xs font-medium'>
                    Completed
                  </span>
                ) : (
                  <div className='flex gap-2'>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className='w-8 cursor-pointer hover:scale-110 transition'
                      src={assets.cancel_icon}
                      alt=''
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className='w-8 cursor-pointer hover:scale-110 transition'
                      src={assets.tick_icon}
                      alt=''
                    />
                  </div>
                )}

              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard