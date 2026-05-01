// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// // import { assets } from "../assets/assets";
// import { NavLink, useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'


// const Navbar = () => {
//   const navigate = useNavigate()
//   const [showMenu, setShowMenu] = useState(false)
//   const { token, setToken, userData } = useContext(AppContext)

//   const logout = () => {
//     setToken(false)
//     localStorage.removeItem('token')
//   }
//   return (

//     <div className='flex items-center justify-between text-sm py-2 mb-5 border-b border-b-gray-400'>
//       <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt='' />


//       <ul className='hidden md:flex items-start gap-5 font-medium'>
//         <NavLink to="/">
//           <li className='py-1'>HOME</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to="/doctors">
//           <li className='py-1'>ALL DOCTORS</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to="/about">
//           <li className='py-1'>ABOUT</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to="/contact">
//           <li className='py-1'>CONTACT</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//       </ul>

//       <div className='flex items-center gap-4'>
//         <button
//           onClick={() => window.location.href = "https://doctor-appointment-8lnn.vercel.app"}
//             className="border border-gray-300 px-5 py-2 rounded-full hidden md:block hover:bg-gray-100 transition">
//           Admin Panel
//         </button>

//         {
//           token && userData
//             ? <div className='flex items-center gap-2 cursor-pointer group relative'>
//               <img className='w-8 rounded-full' src={userData.image} alt='' />
//               <img className='w-2.5' src={assets.dropdown_icon} alt='' />
//               <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
//                 <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
//                   <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
//                   <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
//                   <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
//                 </div>
//               </div>
//             </div> :
//             <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
//         }

//         <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt='' />

//         {/* Mobile Menu */}
//         <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
//           <div className='flex items-center justify-between px-5 py-6'>
//             <img className='w-36' src={assets.logo} alt='' />
//             <img className='w-7 ' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt='' />
//           </div>
//           <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
//             <NavLink onClick={() => setShowMenu(false)} to="/"><p className="px-4 py-2 rounded inline-block">Home</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to="/doctors"><p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to="/about"><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to="/contact"><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
//           </ul>

//           <button
//             onClick={() => {
//               setShowMenu(false);
//               window.location.href =
//                 "https://doctor-appointment-8lnn.vercel.app";
//             }}
//             className="border  px-6 py-2 rounded-full mt-4"
//           >
//             Admin Panel
//           </button>


//         </div>

//       </div>

//     </div>



//   )
// }

// export default Navbar

import React, { useContext, useState, useCallback } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const navLinks = [
  { name: "HOME", path: "/" },
  { name: "ALL DOCTORS", path: "/doctors" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
];

const ADMIN_URL = "https://doctor-appointment-8lnn.vercel.app";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const { token, setToken, userData } = useContext(AppContext);

  const logout = useCallback(() => {
    setToken(false);
    localStorage.removeItem("token");
  }, [setToken]);

  const openAdminPanel = () => {
    window.location.href = ADMIN_URL;
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-between text-sm py-3 mb-5 border-b border-b-gray-200 shadow-sm transition-all duration-300 px-4 md:px-0">

      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        {navLinks.map((link) => (
          <NavLink key={link.path} to={link.path}>
            <li className="py-1">{link.name}</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-4">

        {/* Desktop Admin Button */}
        <button
          onClick={openAdminPanel}
          className="border border-gray-300 px-5 py-2 rounded-full hidden md:block hover:bg-gray-100 hover:shadow-sm transition-all duration-300"
        >
          Admin Panel
        </button>

        {/* User Section */}
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">

            <img
              className="w-8 rounded-full"
              src={userData.image}
              alt="user"
            />

            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="dropdown"
            />

            {/* Dropdown */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">

                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>

                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>

                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>

              </div>
            </div>

          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3 rounded-full font-light hidden md:block hover:scale-105 hover:shadow-premium transition-all duration-300"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />

        {/* Mobile Menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >

          {/* Mobile Header */}
          <div className="flex items-center justify-between px-5 py-6 border-b">

            <img
              className="w-36"
              src={assets.logo}
              alt="logo"
            />

            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="close"
            />

          </div>

          {/* Mobile Links */}
          <ul className="flex flex-col items-center gap-3 mt-6 px-5 text-lg font-medium">

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                onClick={() => setShowMenu(false)}
                to={link.path}
              >
                <p className="px-4 py-2 rounded inline-block hover:bg-gray-100">
                  {link.name}
                </p>
              </NavLink>
            ))}

            {/* Mobile Admin Panel */}
            <button
              onClick={() => {
                setShowMenu(false);
                openAdminPanel();
              }}
              className="border border-gray-300 px-6 py-2 rounded-full mt-4 items-center hover:bg-gray-100 transition"
            >
              Admin Panel
            </button>

          </ul>

        </div>

      </div>
    </div>
  );
};

export default Navbar;