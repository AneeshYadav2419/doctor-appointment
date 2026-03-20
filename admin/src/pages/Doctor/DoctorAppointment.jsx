// import React from 'react'
// import { useContext } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import { useEffect } from 'react'
// import { AppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'

// const DoctorAppointment = () => {
//     const { dToken, appointments, getAllAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
//     const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
//     useEffect(() => {
//         if (dToken) {
//             getAllAppointments()
//         }
//     }, [dToken])

//     return (
//         <div className='w-full max-w-6xl m-5'>
//             <p className='mb-3 text-lg font-medium'>All Appointments</p>
//             <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
//                 <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
//                     <p>#</p>
//                     <p>Patient</p>
//                     <p>Payment</p>
//                     <p>Age</p>
//                     <p>Date & Time</p>
//                     <p>Fees</p>
//                     <p>Action</p>
//                 </div>

//                 {
//                     appointments.reverse().map((item, index) => (
//                         <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
//                             <p className='max-sm:hidden'>{index + 1}</p>
//                             <div className='flex items-center gap-2'>
//                                 <img className='w-8 rounded-full' src={item.userData.image} alt='' /> <p>{item.userData.name}</p>
//                             </div>
//                             <div>
//                                 <p className='text-xs inline border border-primary px-2 rounded-full'>
//                                     {item.payment ? 'Online' : 'Cash'}
//                                 </p>
//                             </div>
//                             <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//                             <p>{slotDateFormat(item.slotDate)}</p>
//                             <p>{currency}{item.amount}</p>
//                             {
//                                 item.cancelled
//                                     ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                                     : item.isCompleted
//                                         ? <p className='text-green-500 text-xs font-medium'>Completed</p>
//                                         : <div className='flex'>
//                                             <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt='' />
//                                             <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt='' />
//                                         </div>
//                             }


//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }

// export default DoctorAppointment

import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {

  const {
    dToken,
    appointments,
    getAllAppointments,
    completeAppointment,
    cancelAppointment
  } = useContext(DoctorContext)

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAllAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full px-3 sm:px-6 py-4'>

      <div className='max-w-6xl mx-auto'>

        {/* Title */}
        <h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-4'>
          Appointments
        </h2>

        {/* Container */}
        <div className='bg-white rounded-2xl shadow-sm border overflow-hidden'>

          {/* Desktop Header */}
          <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] px-6 py-3 bg-gray-50 border-b text-sm font-medium text-gray-700'>
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          {/* List */}
          <div className='max-h-[75vh] overflow-y-auto'>

            {
              appointments && appointments.length > 0 ? (
                [...appointments].reverse().map((item, index) => (

                  <div
                    key={item._id}
                    className='border-b px-4 py-4 md:px-6 md:py-3 hover:bg-gray-50 transition'
                  >

                    {/* MOBILE VIEW */}
                    <div className='flex flex-col gap-3 md:hidden'>

                      {/* Top */}
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <img
                            className='w-10 h-10 rounded-full object-cover'
                            src={item.userData.image}
                            alt=''
                          />
                          <div>
                            <p className='font-medium text-gray-800'>
                              {item.userData.name}
                            </p>
                            <p className='text-xs text-gray-500'>
                              Age: {calculateAge(item.userData.dob)}
                            </p>
                          </div>
                        </div>

                        {/* Payment */}
                        <span className={`text-xs px-2 py-1 rounded-full border
                          ${item.payment
                            ? 'bg-green-50 text-green-600 border-green-500'
                            : 'bg-yellow-50 text-yellow-600 border-yellow-500'
                          }`}>
                          {item.payment ? 'Online' : 'Cash'}
                        </span>
                      </div>

                      {/* Middle */}
                      <div className='flex justify-between text-sm text-gray-600'>
                        <p>
                          {slotDateFormat(item.slotDate)}
                        </p>
                        <p className='font-medium'>
                          {currency} {item.amount}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className='flex justify-between items-center'>

                        {
                          item.cancelled ? (
                            <p className='text-red-500 text-xs font-semibold'>
                              Cancelled
                            </p>

                          ) : item.isCompleted ? (
                            <p className='text-green-500 text-xs font-semibold'>
                              Completed
                            </p>

                          ) : (
                            <div className='flex gap-3'>
                              <img
                                onClick={() => cancelAppointment(item._id)}
                                className='w-9 cursor-pointer active:scale-90'
                                src={assets.cancel_icon}
                                alt=''
                              />

                              <img
                                onClick={() => completeAppointment(item._id)}
                                className='w-9 cursor-pointer active:scale-90'
                                src={assets.tick_icon}
                                alt=''
                              />
                            </div>
                          )
                        }

                      </div>

                    </div>

                    {/* DESKTOP VIEW */}
                    <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] items-center text-gray-600'>

                      <p>{index + 1}</p>

                      <div className='flex items-center gap-2'>
                        <img
                          className='w-9 h-9 rounded-full object-cover'
                          src={item.userData.image}
                          alt=''
                        />
                        <p className='font-medium text-gray-800'>
                          {item.userData.name}
                        </p>
                      </div>

                      <span className={`text-xs px-2 py-1 rounded-full border w-fit
                        ${item.payment
                          ? 'bg-green-50 text-green-600 border-green-500'
                          : 'bg-yellow-50 text-yellow-600 border-yellow-500'
                        }`}>
                        {item.payment ? 'Online' : 'Cash'}
                      </span>

                      <p>{calculateAge(item.userData.dob)}</p>

                      <p className='text-sm'>
                        {slotDateFormat(item.slotDate)}, {item.slotTime}
                      </p>

                      <p className='font-semibold'>
                        {currency} {item.amount}
                      </p>

                      <div>
                        {
                          item.cancelled ? (
                            <p className='text-red-500 text-xs font-semibold'>
                              Cancelled
                            </p>

                          ) : item.isCompleted ? (
                            <p className='text-green-500 text-xs font-semibold'>
                              Completed
                            </p>

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
                          )
                        }
                      </div>

                    </div>

                  </div>
                ))
              ) : (
                <p className='text-center text-gray-400 py-10'>
                  No Appointments Found
                </p>
              )
            }

          </div>

        </div>
      </div>
    </div>
  )
}

export default DoctorAppointment