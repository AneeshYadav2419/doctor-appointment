// import React from 'react'
// import Login from './pages/Login'
// import { ToastContainer, toast } from 'react-toastify';
// import { useContext } from 'react';
// import { AdminContext } from './context/AdminContext';
// import Navbar from './components/Navbar';
// import SideBar from './components/SideBar';
// import { Route, Routes } from 'react-router-dom';
// import Dashboard from './pages/Admin/Dashboard';
// import AllAppointments from './pages/Admin/AllAppointments';
// import AddDoctor from './pages/Admin/AddDoctor';
// import DoctorsList from './pages/Admin/DoctorsList';
// import { DoctorContext } from './context/DoctorContext';
// import DoctorDashboard from './pages/Doctor/DoctorDashboard';
// import DoctorAppointment from './pages/Doctor/DoctorAppointment';
// import DoctorProfile from './pages/Doctor/DoctorProfile';

// const App = () => {

//   const { aToken } = useContext(AdminContext)

//   const { dToken } = useContext(DoctorContext)

//   return aToken || dToken ? (
//     <div className='bg-[#F8F9FD]'>
//       <ToastContainer />
//       <Navbar />
//       <div className='flex items-start'>
//         <SideBar />
//         {/* admin route  */}
//         <Routes>
//           <Route path='/' element={<></>} />
//           <Route path='/admin-dashboard' element={<Dashboard />} />
//           <Route path='/all-appointments' element={<AllAppointments />} />
//           <Route path='/add-doctor' element={<AddDoctor />} />
//           <Route path='/doctor-list' element={<DoctorsList />} />

//           {/* doctor Route  */}
//           <Route path='/doctor-dashboard' element={<DoctorDashboard />}/>
//           <Route path='/doctor-appointments' element={<DoctorAppointment />}/>
//           <Route path='/doctor-profile' element={<DoctorProfile />}/>
          

//         </Routes>
//       </div>
//     </div>
//   ) : (
//     <>
//       <Login />
//       <ToastContainer />
//     </>

//   )
// }

// export default App
import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import { AdminContext } from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import { Route, Routes } from 'react-router-dom'

// Admin Pages
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'

// Doctor Pages
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointment from './pages/Doctor/DoctorAppointment'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const isAdmin = !!aToken
  const isDoctor = !!dToken
  const isLoggedIn = isAdmin || isDoctor

  return isLoggedIn ? (
    <div className='min-h-screen bg-gradient-to-br from-[#f8f9fd] to-[#eef1ff]'>

      <ToastContainer />

      <Navbar />

      <div className='flex'>

        <SideBar />

        <div className='flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto h-[calc(100vh-70px)]'>

          <Routes>
            <Route path='/' element={<></>} />

            {/* Admin Routes */}
            {isAdmin && (
              <>
                <Route path='/admin-dashboard' element={<Dashboard />} />
                <Route path='/all-appointments' element={<AllAppointments />} />
                <Route path='/add-doctor' element={<AddDoctor />} />
                <Route path='/doctor-list' element={<DoctorsList />} />
              </>
            )}

            {/* Doctor Routes */}
            {isDoctor && (
              <>
                <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
                <Route path='/doctor-appointments' element={<DoctorAppointment />} />
                <Route path='/doctor-profile' element={<DoctorProfile />} />
              </>
            )}
          </Routes>

        </div>
      </div>
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white'>
      <ToastContainer />
      <Login />
    </div>
  )
}

export default App