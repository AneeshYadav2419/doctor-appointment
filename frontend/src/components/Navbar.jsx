// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// // import { assets } from "../assets/assets";
// import { NavLink, useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'


// const Navbar = () => {
//     const navigate = useNavigate()
//     const [showMenu, setShowMenu] = useState(false)
//     const { token, setToken, userData } = useContext(AppContext)

//     const logout = () => {
//         setToken(false)
//         localStorage.removeItem('token')
//     }
//     return (

//         <div className='flex items-center justify-between text-sm py-2 mb-5 border-b border-b-gray-400'>
//             <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt='' />


//             <ul className='hidden md:flex items-start gap-5 font-medium'>
//                 <NavLink to="/">
//                     <li className='py-1'>HOME</li>
//                     <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//                 </NavLink>
//                 <NavLink to="/doctors">
//                     <li className='py-1'>ALL DOCTORS</li>
//                     <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//                 </NavLink>
//                 <NavLink to="/about">
//                     <li className='py-1'>ABOUT</li>
//                     <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//                 </NavLink>
//                 <NavLink to="/contact">
//                     <li className='py-1'>CONTACT</li>
//                     <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//                 </NavLink>
//             </ul>

//             <div className='flex items-center gap-4'>
//                 <button
//                     onClick={() => window.location.href = "https://doctor-appointment-8lnn.vercel.app"}
//                     className='border px-5 py-2 rounded-full hidden md:block'>
//                     Admin Panel
//                 </button>

//                 {
//                     token && userData
//                         ? <div className='flex items-center gap-2 cursor-pointer group relative'>
//                             <img className='w-8 rounded-full' src={userData.image} alt='' />
//                             <img className='w-2.5' src={assets.dropdown_icon} alt='' />
//                             <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
//                                 <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
//                                     <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
//                                     <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
//                                     <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
//                                 </div>
//                             </div>
//                         </div> :
//                         <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
//                 }

//                 <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt='' />

//                 {/* Mobile Menu */}
//                 <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
//                     <div className='flex items-center justify-between px-5 py-6'>
//                         <img className='w-36' src={assets.logo} alt='' />
//                         <img className='w-7 ' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt='' />
//                     </div>
//                     <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
//                         <NavLink onClick={() => setShowMenu(false)} to="/"><p className="px-4 py-2 rounded inline-block">Home</p></NavLink>
//                         <NavLink onClick={() => setShowMenu(false)} to="/doctors"><p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
//                         <NavLink onClick={() => setShowMenu(false)} to="/about"><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
//                         <NavLink onClick={() => setShowMenu(false)} to="/contact"><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
//                     </ul>

//                 </div>

//             </div>

//         </div>



//     )
// }

//  export default Navbar


import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useCallback } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

    const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ALL DOCTORS", path: "/doctors" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  const logout = useCallback(() => {
    setToken(false);
    localStorage.removeItem("token");
  }, [setToken]);



  return (
    <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between py-3 px-4 md:px-8 lg:px-16">

        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="w-36 md:w-44 cursor-pointer"
          src={assets.logo}
          alt="logo"
        />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative py-1 transition-colors ${isActive ? "text-primary" : "hover:text-primary"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Admin Panel */}
          <button
            onClick={() =>
            (window.location.href =
              "https://doctor-appointment-8lnn.vercel.app")
            }
            className="border border-gray-300 px-5 py-2 rounded-full hidden md:block hover:bg-gray-100 transition"
          >
            Admin Panel
          </button>

          {/* User Section */}
          {token && userData ? (
            <div className=" hidden md:flex  items-center gap-2 cursor-pointer group relative">

              <img
                className="w-8 h-8 rounded-full object-cover"
                src={userData.image}
                alt="user"
              />

              <img
                className="w-2.5 transition-transform group-hover:rotate-180"
                src={assets.dropdown_icon}
                alt=""
              />

              {/* Dropdown */}
              <div className="absolute right-0 top-8 pt-2 hidden group-hover:block">
                <div className="bg-white shadow-lg border rounded-lg text-sm text-gray-600">
                  <div className="flex flex-col min-w-44 p-2">

                    <p
                      onClick={() => navigate("/my-profile")}
                      className="px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black cursor-pointer transition-all duration-200"
                    >
                      My Profile
                    </p>

                    <p
                      onClick={() => navigate("/my-appointments")}
                      className="px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black cursor-pointer transition-all duration-200"
                    >
                      My Appointments
                    </p>

                    <hr className="my-1 border-gray-200" />

                    <p
                      onClick={logout}
                      className="px-4 py-2 rounded-md hover:bg-red-50 hover:text-red-600 cursor-pointer transition-all duration-200"
                    >
                      Logout
                    </p>

                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-6 py-2 rounded-full font-light hidden md:block hover:opacity-90 transition"
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
            className={`fixed top-0 right-0 h-full bg-white z-40 transition-all duration-300 ${showMenu ? "w-full" : "w-0 overflow-hidden"
              }`}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <img className="w-32" src={assets.logo} alt="" />
              <img
                className="w-6 cursor-pointer"
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                alt=""
              />
            </div>

            {/* Mobile Links */}
            <ul className="flex flex-col items-center gap-6 mt-10 text-lg font-medium text-gray-700">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  onClick={() => setShowMenu(false)}
                  to={link.path}
                  className="hover:text-primary transition"
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Admin Panel Mobile */}
              <button
                onClick={() => {
                  setShowMenu(false);
                  window.location.href =
                    "https://doctor-appointment-8lnn.vercel.app";
                }}
                className="border px-6 py-2 rounded-full mt-4"
              >
                Admin Panel
              </button>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Navbar);