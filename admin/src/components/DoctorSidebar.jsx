// import React from 'react'

// import { useContext } from 'react'
// import { NavLink } from 'react-router-dom'
// import { assets } from '../assets/assets'
// import { DoctorContext } from '../context/DoctorContext'

// const DoctorSidebar = () => {
//     const {dToken} = useContext(DoctorContext)
//   return (
//     <div className='min-h-screen bg-white border-r'>
//                 {
                
//             dToken && <ul className='text-[#515151] mt-5'>

//                 <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `} to={'/doctor-dashboard'}>
//                     <img src={assets.home_icon} alt=''/>
//                     <p className='hidden md:block'>Dashboard</p>
//                 </NavLink>
//                  <NavLink  className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `} to={'/doctor-appointments'}>
//                     <img src={assets.appointment_icon} alt=''/>
//                     <p  className='hidden md:block'>Appointments</p>
//                 </NavLink>
    
//                  <NavLink  className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `} to={'/doctor-profile'}>
//                     <img src={assets.people_icon} alt=''/>
//                     <p  className='hidden md:block'>Profile</p>
//                 </NavLink>
//             </ul>
//         }
//     </div>
//   )
// }

// export default DoctorSidebar

import React, { useContext, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const DoctorSidebar = () => {
  const { dToken } = useContext(DoctorContext)

  // clean menu config
  const menuItems = useMemo(() => [
    { name: 'Dashboard', path: '/doctor-dashboard', icon: assets.home_icon },
    { name: 'Appointments', path: '/doctor-appointments', icon: assets.appointment_icon },
    { name: 'Profile', path: '/doctor-profile', icon: assets.people_icon }
  ], [])

  return (
    <div className='h-screen flex-shrink-0 bg-white border-r shadow-sm 
                    w-16 md:w-64 min-w-[64px] md:min-w-[256px] transition-all duration-300'>

      {dToken && (
        <ul className='text-gray-600 mt-5 space-y-2'>

          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-3 md:px-6 cursor-pointer rounded-l-full transition-all duration-200
                ${isActive
                  ? 'bg-indigo-50 text-primary border-r-4 border-primary shadow-sm'
                  : 'hover:bg-gray-100'
                }`
              }
            >
              <img
                src={item.icon}
                alt={item.name}
                className='w-5 h-5 min-w-[20px]'
              />

              {/* text hidden on mobile */}
              <p className='hidden md:block text-sm font-medium'>
                {item.name}
              </p>
            </NavLink>
          ))}

        </ul>
      )}
    </div>
  )
}

export default React.memo(DoctorSidebar)