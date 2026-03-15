// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import { assets } from '../assets/assets'
// import RelatedDoctor from '../components/RelatedDoctor'
// import { toast } from 'react-toastify'
// import axios from 'axios'

// const Appointments = () => {
//   const { docId } = useParams()
//   const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
//   const [docInfo, setDocInfo] = useState(null)
//   const [docSlots, setDocSlots] = useState([])
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState('')
//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
//   const naviagte = useNavigate()

//   const fetchDocInfo = async () => {
//     const docInfo = doctors.find(doc => doc._id === docId)
//     setDocInfo(docInfo)

//   }

//   const getAvailableSlots = async () => {
//     setDocSlots([])
//     //getting current date
//     let today = new Date()

//     for (let i = 0; i < 7; i++) {
//       //get date with index
//       let currentDate = new Date(today)
//       currentDate.setDate(today.getDate() + i)

//       //setting ends time of the date with index
//       let endTime = new Date()
//       endTime.setDate(today.getDate() + i)
//       endTime.setHours(21, 0, 0, 0)

//       //setting hours

//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
//       } else {
//         currentDate.setHours(10)
//         currentDate.setMinutes(0)
//       }

//       let timeSlots = []

//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

//         let day = currentDate.getDate()
//         let month = currentDate.getMonth() + 1
//         let year = currentDate.getFullYear()

//         let slotDate = day + "_" + month + "_" + year
//         const slotTime = formattedTime

//         const isSlotAvailable = docInfo.slots_booked[slotDate] &&
//           docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

//         if (isSlotAvailable) {
//           timeSlots.push({
//             datetime: new Date(currentDate),
//             time: formattedTime
//           })
//         }

//         //increment time by 30 min
//         currentDate.setMinutes(currentDate.getMinutes() + 30)
//       }

//       setDocSlots(prev => ([...prev, timeSlots]))
//     }
//   }

//   const bookAppointment = async () => {
//     if (!token) {
//       toast.warn('Login  to book appointment')
//       return naviagte('/login')
//     }
//     try {
//       const date = docSlots[slotIndex][0].datetime
//       let day = date.getDate()
//       let month = date.getMonth() + 1
//       let year = date.getFullYear()
//       const slotDate = day + "_" + month + "_" + year

//       const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
//       if (data.success) {
//         toast.success(data.message)
//         getDoctorsData()
//         naviagte('/my-appointments')
//       } else {
//         toast.error(data.message)
//       }

//       // console.log(slotDate)
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)

//     }
//   }

//   useEffect(() => {
//     fetchDocInfo()
//   }, [doctors, docId])


//   useEffect(() => {
//     getAvailableSlots()
//   }, [docInfo])

//   useEffect(() => {
//     console.log(docSlots)
//   }, [docSlots])

//   return docInfo && (
//     <div>
//       {/* Doctor details */}
//       <div className='flex flex-col sm:flex-row gap-4'>
//         <div>
//           <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt='' />
//         </div>
//         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
//           {/* Doc info : name, degree,experience */}
//           <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
//             {docInfo.name}
//             <img className='w-5' src={assets.verified_icon} alt='' />
//           </p>
//           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//             <p>{docInfo.degree} - {docInfo.speciality}</p>
//             <button className='py-0.5 px-2 border- text-xs rounded-full'>{docInfo.experience}</button>
//           </div>
//           {/* 
//           Doctor About */}
//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
//               About <img src={assets.info_icon} alt='' />
//             </p>
//             <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
//           </div>
//           <p className='text-gray-500 font-medium mt-4'>
//             Appointment fee: <span>{currencySymbol}{docInfo.fees}</span>
//           </p>
//         </div>
//       </div>

//       {/* booking slots */}
//       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
//         <p>Booking Slots</p>
//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//           {
//             docSlots.length > 0 && docSlots.map((item, index) => (
//               <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
//                 <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//                 <p>{item[0] && item[0].datetime.getDate()}</p>
//               </div>
//             ))
//           }

//         </div>

//         <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//           {docSlots.length && docSlots[slotIndex].map((item, index) => (
//             <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-primary text-white" : 'text-gray-400 border border-x-gray-200'}`} key={index}>
//               {item.time.toLowerCase()}
//             </p>
//           ))}

//         </div>
//         <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book Appointment</button>

//       </div>

//       <RelatedDoctor docId={docId} speciality={docInfo.speciality} />

//     </div>
//   )
// }

// export default Appointments

import React, { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctor from "../components/RelatedDoctor";
import { toast } from "react-toastify";
import axios from "axios";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const Appointments = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Memoized doctor info
  const docInfo = useMemo(() => {
    return doctors.find((doc) => doc._id === docId);
  }, [doctors, docId]);

  // Generate slots
  const getAvailableSlots = useCallback(() => {
    if (!docInfo) return;

    const slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;

        const isSlotAvailable =
          !docInfo.slots_booked?.[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  }, [docInfo]);

  useEffect(() => {
    getAvailableSlots();
  }, [getAvailableSlots]);

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!docInfo) return null;

  return (
    <div>
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          className="bg-primary w-full sm:max-w-72 rounded-lg"
          src={docInfo.image}
          alt={docInfo.name}
        />

        <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>

          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <span className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </span>
          </div>

          <div className="mt-3">
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 mt-1 max-w-[700px]">
              {docInfo.about}
            </p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span>
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-6">
        <p className="font-medium text-gray-700">Booking Slots</p>

        <div className="flex gap-3 overflow-x-auto mt-4">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index
                  ? "bg-primary text-white"
                  : "border border-gray-200"
              }`}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto mt-4">
          {docSlots[slotIndex]?.map((item) => (
            <p
              key={item.time}
              onClick={() => setSlotTime(item.time)}
              className={`text-sm px-5 py-2 rounded-full cursor-pointer ${
                item.time === slotTime
                  ? "bg-primary text-white"
                  : "text-gray-400 border"
              }`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm px-14 py-3 rounded-full my-6"
        >
          Book Appointment
        </button>
      </div>

      <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default React.memo(Appointments);