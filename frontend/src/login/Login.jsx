import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const {setAuthUser} = useAuth()


  const [userInput, setUserInput] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const handleInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post('/api/auth/login', userInput)
      const data = res.data

      if (data.success === false) {
        toast.error(data.message)
        setLoading(false)
        return
      }

      toast.success(data.message)
      localStorage.setItem('chatapp', JSON.stringify(data))
          setAuthUser(data)
       

      navigate('/')

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center max-w-full mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-lg bg-gray-100 bg-opacity-0 backdrop-blur-lg'>
        <h1 className='text-3xl font-bold text-center text-gray-800'>
          Login <span className='text-gray-950'>Chatters</span>
        </h1>

        <form onSubmit={handleSubmit} className='flex flex-col text-black'>
          <div>
            <label className='label p-2'>
              <span className='font-bold text-gray-950 text-xl'>Email :</span>
            </label>
            <input
              id='email'
              type='email'
              value={userInput.email}
              onChange={handleInput}
              placeholder='Enter your email'
              required
              className='w-full input input-bordered h-10'
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='font-bold text-gray-950 text-xl'>Password :</span>
            </label>
            <input
              id='password'
              type='password'
              value={userInput.password}
              onChange={handleInput}
              placeholder='Enter your password'
              required
              className='w-full input input-bordered h-10'
            />
          </div>

          <button
            type='submit'
            className='mt-4 self-center px-4 py-2 bg-gray-950 text-white rounded-lg hover:bg-gray-900'
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <div className='pt-2'>
          <p className='text-sm font-semibold text-gray-800'>
            Don&apos;t have an account?{' '}
            <Link to='/register'>
              <span className='font-bold underline cursor-pointer hover:text-green-700'>
                Register Now!!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
