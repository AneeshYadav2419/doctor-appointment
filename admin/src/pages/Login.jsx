// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { AdminContext } from '../context/AdminContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { DoctorContext } from '../context/DoctorContext'

// const Login = () => {

//   const [state, setState] = useState('Admin')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const {setAToken,backendUrl} = useContext(AdminContext)
//   const {setDToken} = useContext(DoctorContext)

//   const onSubmitHandler = async (event) => {
//     event.preventDefault()

//     try {
//       if(state === 'Admin'){
//         const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})

//         if(data.success){
//           localStorage.setItem('aToken', data.token)
//           setAToken(data.token)
//         }else{
//           toast.error(data.message)
//         }
//       }
//       else{
//         const {data} = await axios.post(backendUrl +'/api/doctor/login',{email,password})
//          if(data.success){
//           localStorage.setItem('dToken', data.token)
//           setDToken(data.token)
//           console.log(data.token)
//         }else{
//           toast.error(data.message)
//         }
//       }
      
//     } catch (error) {
      
//     }
//   }
//   return (
//     <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
//       <div className='flex flex-col gap-3 m-auto items-start p-8  sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
//         <p className='text-2xl font-semibold m-auto'><span className='text-primary'> {state} </span>Login</p>
//         <div className='w-full'>
//           <p>Email</p>
//           <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='email'required />
//         </div>
//         <div className='w-full'>
//           <p>Password</p>
//           <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='password' required />
//         </div>
//         <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>

//         {
//           state === "Admin"
//           ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
//           : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState("Admin")}>Click here</span></p>
//         }
//       </div>

//     </form>
    
//   )
// }

// export default Login
import React, { useContext, useState, useCallback } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const navigate = useNavigate()

  const onSubmitHandler = useCallback(async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const url =
        state === 'Admin'
          ? `${backendUrl}/api/admin/login`
          : `${backendUrl}/api/doctor/login`

      const { data } = await axios.post(url, { email, password })

      if (data.success) {

        if (state === 'Admin') {
          // ✅ Save admin token
          localStorage.setItem('aToken', data.token)

          // 🔥 IMPORTANT: remove doctor token
          localStorage.removeItem('dToken')

          setAToken(data.token)

          // 🔥 Redirect
          navigate('/admin-dashboard')

        } else {
          // ✅ Save doctor token
          localStorage.setItem('dToken', data.token)

          // 🔥 IMPORTANT: remove admin token
          localStorage.removeItem('aToken')

          setDToken(data.token)

          // 🔥 Redirect
          navigate('/doctor-dashboard')
        }

        toast.success('Login successful 🚀')

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }

  }, [state, email, password, backendUrl, setAToken, setDToken, navigate])

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4'>

      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border'
      >

        {/* Title */}
        <p className='text-2xl font-bold text-center mb-6'>
          <span className='text-primary'>{state}</span> Login
        </p>

        {/* Email */}
        <div className='mb-4'>
          <label className='text-sm font-medium'>Email</label>
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full mt-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
            placeholder='Enter your email'
          />
        </div>

        {/* Password */}
        <div className='mb-4'>
          <label className='text-sm font-medium'>Password</label>
          <input
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full mt-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
            placeholder='Enter your password'
          />
        </div>

        {/* Button */}
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 disabled:opacity-50'
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Switch */}
        <p className='text-sm text-center mt-4'>
          {state === 'Admin' ? (
            <>
              Doctor Login?{' '}
              <span
                className='text-primary font-medium cursor-pointer hover:underline'
                onClick={() => setState('Doctor')}
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{' '}
              <span
                className='text-primary font-medium cursor-pointer hover:underline'
                onClick={() => setState('Admin')}
              >
                Click here
              </span>
            </>
          )}
        </p>

      </form>
    </div>
  )
}

export default React.memo(Login)