// import React from 'react'
// import { assets } from '../assets/assets'
// import { useContext } from 'react'
// import { AdminContext } from '../context/AdminContext'
// import { useNavigate} from 'react-router-dom'
// import { DoctorContext } from '../context/DoctorContext'

// const Navbar = () => {
//     const {aToken, setAToken} = useContext(AdminContext)
//     const {dToken, setDToken} = useContext(DoctorContext)
//     const navigate = useNavigate()

//     const logout = () => {
//         navigate('/')
//         aToken && setAToken('')
//         aToken && localStorage.removeItem('atoken')
//         dToken && setDToken('')
//         dToken && localStorage.removeItem('dToken')
//     }
//   return (
//     <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
//         <div className='flex items-center gap-2 text-xs'>
//             <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt=''/>
//             <p className='border px-2.5 py-0.5 rounded-full border-gray-500'>{aToken ? 'Admin' : 'Doctor'}</p>
//         </div>
//         <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
//     </div>
//   )
// }

// export default Navbar

import React, { useContext, useCallback, useMemo } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const role = useMemo(() => (aToken ? 'Admin' : 'Doctor'), [aToken])

  const logout = useCallback(() => {
    if (aToken) {
      setAToken('')
      localStorage.removeItem('atoken')
    }

    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }

    navigate('/')
  }, [aToken, dToken, setAToken, setDToken, navigate])

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b'>

      {/* Left Section */}
      <div className='flex items-center gap-3'>
        <img
          className='w-32 sm:w-36 cursor-pointer transition-transform duration-200 hover:scale-105'
          src={assets.admin_logo}
          alt='Logo'
        />

        <span className='text-gray-300'>|</span>

        <p className={`px-3 py-1 text-xs font-semibold rounded-full 
          ${role === 'Admin'
            ? 'bg-blue-100 text-blue-600'
            : 'bg-green-100 text-green-600'
          }`}>
          {role}
        </p>
      </div>

      {/* Right Section */}
      <button
        onClick={logout}
        className='flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm px-5 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95'
      >
        Logout
      </button>

    </div>
  )
}

export default React.memo(Navbar)