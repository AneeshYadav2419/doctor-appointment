// import React from 'react'
// import { assets } from '../assets/assets'

// const Footer = () => {
//   return (
//     <div className='md:mx-10'>
//         <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm' >
//             {/* left section */}
//             <div>
//                 <img className='mb-5 w-40' src={assets.logo} alt=''/>
//                 <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, fugiat magni. Facere optio natus voluptatum, suscipit, dolorum voluptate temporibus inventore corporis quam delectus, consectetur earum? Omnis illum velit possimus odit!</p>
//             </div>
//              {/* center section */}
//             <div>
//                 <p className='text-xl font-medium mb-5'>Company</p>
//                 <ul className='flex flex-col gap-2 text-gray-600'>
//                     <li>Home</li>
//                     <li>About us</li>
//                     <li>Contact us</li>
//                     <li>Privacy Policy</li>
//                 </ul>
                
//             </div>

//              {/* right section */}
//             <div>
//                 <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
//                 <ul  className='flex flex-col gap-2 text-gray-600'>
//                     <li>9592383952</li>
//                     <li>aneeshy1508cse@gmail.com</li>
//                 </ul>
//             </div>
//         </div>

//         <div>
//             <hr />
//             <p className='py-5 text-sm text-center'>Copyright 2024@ Medilink - All Right Reserved</p>
//         </div>

//     </div>
//   )
// }

// export default Footer


import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 md:px-10 lg:px-20 mt-40 border-t border-gray-200">

      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-12 py-10 text-sm text-gray-700">

        {/* Left Section */}
        <div>
          <img
            className="mb-6 w-40"
            src={assets.logo}
            alt="Medilink logo"
            loading="lazy"
          />

          <p className="leading-relaxed text-gray-600 md:w-2/3">
            Medilink helps patients easily connect with trusted doctors and
            book appointments online. Our platform simplifies healthcare
            access by providing a seamless and reliable booking experience.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-lg font-semibold mb-5">Company</p>

          <ul className="flex flex-col gap-3 text-gray-600">
            <li>
              <Link
                to="/"
                className="hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-primary transition-colors duration-200"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>

            <li className="hover:text-primary transition-colors duration-200 cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-lg font-semibold mb-5">Get In Touch</p>

          <ul className="flex flex-col gap-3 text-gray-600">
            <li>📞 9592383952</li>
            <li>✉️ aneeshy1508cse@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200">
        <p className="py-6 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} Medilink. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
};

export default React.memo(Footer);