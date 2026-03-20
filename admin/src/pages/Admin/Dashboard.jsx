// import React from 'react'
// import { useContext } from 'react'
// import { AdminContext } from '../../context/AdminContext'
// import { useEffect } from 'react'
// import { assets } from '../../assets/assets'
// import { AppContext } from '../../context/AppContext'

// const Dashboard = () => {
//   const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
//   const { slotDateFormat } = useContext(AppContext)
//   useEffect(() => {
//     if (aToken) {
//       getDashData()
//     }
//   }, [aToken])
//   return dashData && (
//     <div className='m-5'>
//       <div className='flex flex-wrap gap-3'>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.doctor_icon} alt='' />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
//             <p className='text-gray-400'>Doctors</p>
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
//                 <img className='rounded-full w-10' src={item.docData.image} alt='' />
//                 <div className='flex-1 text-sm'>
//                   <p className='text-gray-800 font-medium'>{item.docData.name}</p>
//                   <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
//                 </div>
//                 {item.cancelled
//                   ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                   : item.isCompleted
//                     ? <p className='text-green-500 text-xs font-medium'>Completed</p>
//                     : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt='' />
//                 }
//               </div>
//             ))
//           }

//         </div>
//       </div>

//     </div>
//   )
// }

// export default Dashboard

import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  // 🔥 fetch data
  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken, getDashData])

  // 🔥 memo cancel
  const handleCancel = useCallback((id) => {
    cancelAppointment(id)
  }, [cancelAppointment])

  // 🔥 stats config (clean + scalable)
  const stats = useMemo(() => [
    { label: 'Doctors', value: dashData?.doctors, icon: assets.doctor_icon },
    { label: 'Appointments', value: dashData?.appointments, icon: assets.appointment_icon },
    { label: 'Patients', value: dashData?.patients, icon: assets.patients_icon }
  ], [dashData])

  return dashData && (
    <div className='w-full px-3 sm:px-5 md:px-8 py-4'>

      {/* 🔥 Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

        {stats.map((item, index) => (
          <div
            key={index}
            className='flex items-center gap-4 bg-white p-4 rounded-xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all'
          >
            <img className='w-12 sm:w-14' src={item.icon} alt='' />
            <div>
              <p className='text-lg sm:text-xl font-semibold text-gray-700'>
                {item.value}
              </p>
              <p className='text-gray-400 text-sm'>
                {item.label}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* 🔥 Latest Bookings */}
      <div className='bg-white mt-8 rounded-xl shadow-sm border overflow-hidden'>

        {/* Header */}
        <div className='flex items-center gap-2 px-4 py-4 border-b bg-gray-50'>
          <img src={assets.list_icon} alt='' />
          <p className='font-semibold text-gray-700'>Latest Bookings</p>
        </div>

        {/* List */}
        <div className='max-h-[60vh] overflow-y-auto'>

          {dashData.latestAppointments?.length > 0 ? (
            dashData.latestAppointments.map((item, index) => {

              const doctor = item.docData || {}

              return (
                <div
                  key={item._id || index}
                  className='flex items-center gap-3 px-4 sm:px-6 py-3 border-b hover:bg-gray-50 transition'
                >

                  {/* Doctor Image */}
                  <img
                    className='w-10 h-10 rounded-full object-cover'
                    src={doctor.image}
                    alt=''
                  />

                  {/* Info */}
                  <div className='flex-1 text-sm'>
                    <p className='text-gray-800 font-medium'>
                      {doctor.name}
                    </p>
                    <p className='text-gray-500 text-xs sm:text-sm'>
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    {item.cancelled ? (
                      <p className='text-red-500 text-xs font-semibold'>
                        Cancelled
                      </p>
                    ) : item.isCompleted ? (
                      <p className='text-green-500 text-xs font-semibold'>
                        Completed
                      </p>
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
          ) : (
            <p className='text-center text-gray-400 py-10'>
              No Recent Bookings
            </p>
          )}

        </div>

      </div>

    </div>
  )
}

export default React.memo(Dashboard)