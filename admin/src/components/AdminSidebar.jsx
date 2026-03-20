// import React from 'react'

// import { useContext } from 'react'
// import { AdminContext } from '../context/AdminContext'
// import { NavLink } from 'react-router-dom'
// import { assets } from '../assets/assets'


// const AdminSidebar = () => {
//       const { aToken } = useContext(AdminContext)
//   return (
//     <div className='min-h-screen bg-white border-r'>
//                {
//             aToken && <ul className='text-[#515151] mt-5'>

//                 <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `} to={'/admin-dashboard'}>
//                     <img src={assets.home_icon} alt=''/>
//                     <p>Dashboard</p>
//                 </NavLink>
//                  <NavLink  className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `} to={'/all-appointments'}>
//                     <img src={assets.appointment_icon} alt=''/>
//                     <p>Appointments</p>
//                 </NavLink>
//                  <NavLink  className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `} to={'/add-doctor'}>
//                     <img src={assets.add_icon} alt=''/>
//                     <p>Add Doctor</p>
//                 </NavLink>
    
//                  <NavLink  className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `} to={'/doctor-list'}>
//                     <img src={assets.people_icon} alt=''/>
//                     <p>Doctor List</p>
//                 </NavLink>
//             </ul>
//         }

//     </div>
//   )
// }

// export default AdminSidebar

import React, { useContext, useMemo } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const AdminSidebar = () => {
  const { aToken } = useContext(AdminContext)

  // menu config (clean + scalable)
  const menuItems = useMemo(() => [
    { name: 'Dashboard', path: '/admin-dashboard', icon: assets.home_icon },
    { name: 'Appointments', path: '/all-appointments', icon: assets.appointment_icon },
    { name: 'Add Doctor', path: '/add-doctor', icon: assets.add_icon },
    { name: 'Doctor List', path: '/doctor-list', icon: assets.people_icon }
  ], [])

  return (
    <div className='h-screen flex-shrink-0 bg-white border-r shadow-sm 
                w-16 md:w-64 min-w-[64px] md:min-w-[256px] transition-all duration-300'>

      {aToken && (
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

              {/* Hide text on small screens */}
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

export default React.memo(AdminSidebar)