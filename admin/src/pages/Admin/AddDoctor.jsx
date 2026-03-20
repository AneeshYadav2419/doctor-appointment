// import React from 'react'
// import { assets } from '../../assets/assets'

// const AddDoctor = () => {
//     return (
//         <form className='w-full m-5'>
//             <p className='mb-3 text-lg font-medium'>Add Doctor</p>
//             <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
//                 <div className='flex items-center gap-4 mb-8 text-gray-500'>
//                     <label htmlFor='doc-img'>
//                         <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={assets.upload_area} alt='' />
//                     </label>
//                     <input type='file' id='doc-img' hidden />
//                     <p>Upload doctor <br /> picture</p>
//                 </div>

//                 <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
//                     <div className='w-full lg:flex-1 flex flex-col gap-4'>
//                         <div className='flex-1 flex flex-col gap-1'>
//                             <p>Doctor name</p>
//                             <input type='text' placeholder='Name' required />
//                         </div>

//                         <div className='flex-1 flex flex-col gap-1' >
//                             <p>Doctor Email</p>
//                             <input type='email' placeholder='Email' required />
//                         </div>

//                         <div className='flex-1 flex flex-col gap-1'>
//                             <p>Doctor Password</p>
//                             <input type='password' placeholder='Password' required />
//                         </div>

//                         <div className='flex-1 flex flex-col gap-1'>
//                             <p>Experience</p>
//                             <select name='' id=''>
//                                 <option value="1 Year">1 Year</option>
//                                 <option value="2 Year">2 Year</option>
//                                 <option value="3 Year">3 Year</option>
//                                 <option value="4 Year">4 Year</option>
//                                 <option value="5 Year">5 Year</option>
//                                 <option value="6 Year">6 Year</option>
//                                 <option value="7 Year">7 Year</option>
//                                 <option value="8 Year">8 Year</option>
//                                 <option value="9 Year">9 Year</option>
//                                 <option value="10 Year">10 Year</option>
//                             </select>
//                         </div>

//                         <div className='flex-1 flex flex-col gap-1' >
//                             <p>Fees</p>
//                             <input type='number' placeholder='fees' required />
//                         </div>

//                         <div className='flex-1 flex flex-col gap-1'>
//                             <p>About Doctor</p>
//                             <textarea placeholder='Write about doctor' rows={5} required />
//                         </div>

//                         <button>Add doctor</button>


//                     </div>

//                     {/* // right section  */}
//                     <div className='w-full lg: flex-1 flex flex-col gap-4'>
//                         <div  className='flex-1 flex flex-col gap-1'>
//                             <p>Speciality</p>
//                             <select name='' id=''>
//                                 <option value='General physician'>General physician</option>
//                                 <option value='Gynecologist'>Gynecologist</option>
//                                 <option value='Dermatologist'>Dermatologist</option>
//                                 <option value='Pediatricians'>Pediatricians</option>
//                                 <option value='Neurologist'>Neurologist</option>
//                                 <option value='Gastroenterologist'>Gastroenterologist</option>

//                             </select>
//                         </div>

//                         <div>
//                             <p>Education</p>
//                             <input type='text' placeholder='Education' required />
//                         </div>

//                         <div>
//                             <p>Address</p>
//                             <input type='text' placeholder='address 1' required />
//                             <input type='text' placeholder='address 2' required />

//                         </div>


//                     </div>
//                 </div>
//             </div>
//         </form>
//     )
// }

// export default AddDoctor

import React, { useState, useContext, useCallback } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  // 🔥 optimized submit
  const onSubmitHandler = useCallback(async (event) => {
    event.preventDefault()

    if (!docImg) {
      return toast.error('Image not selected')
    }

    try {
      const formData = new FormData()

      formData.append('image', docImg)
      formData.append('name', name.trim())
      formData.append('email', email.trim())
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', fees)
      formData.append('about', about.trim())
      formData.append('speciality', speciality)
      formData.append('degree', degree.trim())
      formData.append('address', JSON.stringify({
        line1: address1.trim(),
        line2: address2.trim()
      }))

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { aToken } }
      )

      if (data.success) {
        toast.success(data.message)

        // 🔥 reset form clean way
        setDocImg(null)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 Year')
        setFees('')
        setAbout('')
        setSpeciality('General physician')
        setDegree('')
        setAddress1('')
        setAddress2('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }

  }, [docImg, name, email, password, experience, fees, about, speciality, degree, address1, address2, backendUrl, aToken])

  return (
    <div className='w-full px-2 sm:px-4 md:px-6 py-4'>

      <form onSubmit={onSubmitHandler} className='max-w-5xl mx-auto'>

        <h2 className='text-xl sm:text-2xl font-semibold mb-4'>Add Doctor</h2>

        <div className='bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-md border overflow-y-auto'>

          {/* Image Upload */}
          <div className='flex items-center gap-4 mb-6'>
            <label htmlFor='doc-img' className='cursor-pointer'>
              <img
                className='w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border'
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt=''
              />
            </label>
            <input
              type='file'
              id='doc-img'
              hidden
              onChange={(e) => setDocImg(e.target.files[0])}
            />
            <p className='text-sm text-gray-500'>
              Upload doctor <br /> picture
            </p>
          </div>

          {/* Form Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

            {/* LEFT */}
            <div className='flex flex-col gap-4'>

              <Input label="Doctor Name" value={name} onChange={setName} />
              <Input label="Email" type="email" value={email} onChange={setEmail} />
              <Input label="Password" type="password" value={password} onChange={setPassword} />

              <div>
                <p className='text-sm'>Experience</p>
                <select value={experience} onChange={(e) => setExperience(e.target.value)} className='input'>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>
                  ))}
                </select>
              </div>

              <Input label="Fees" type="number" value={fees} onChange={setFees} />

              <div>
                <p className='text-sm'>About Doctor</p>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={4}
                  className='input'
                  placeholder='Write about doctor'
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className='flex flex-col gap-4'>

              <div>
                <p className='text-sm'>Speciality</p>
                <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className='input'>
                  <option>General physician</option>
                  <option>Gynecologist</option>
                  <option>Dermatologist</option>
                  <option>Pediatricians</option>
                  <option>Neurologist</option>
                  <option>Gastroenterologist</option>
                </select>
              </div>

              <Input label="Education" value={degree} onChange={setDegree} />

              <Input label="Address Line 1" value={address1} onChange={setAddress1} />
              <Input label="Address Line 2" value={address2} onChange={setAddress2} />

              {/* Button */}
              <button
                type='submit'
                className='mt-2 bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition'
              >
                Add Doctor
              </button>

            </div>

          </div>

        </div>

      </form>
    </div>
  )
}

// 🔥 Reusable Input Component (clean + fast)
const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <p className='text-sm'>{label}</p>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='input'
      required
    />
  </div>
)

export default React.memo(AddDoctor)