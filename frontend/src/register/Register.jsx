import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate()
      const {setAuthUser} = useAuth();
    const [loading , setLoading] = useState(false);
    const [inputData , setInputData] = useState({})

    const handelInput = (e) => {
        setInputData({
            ...inputData,
            [e.target.id]: e.target.value
        })
    }

    const selectGender = (gender) => {
        setInputData((prev) => ({
            ...prev,
            gender: prev.gender === gender ? '' : gender
        }))
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        
        if (inputData.password !== inputData.confpassword) {
            setLoading(false)
            return toast.error("Password doesn't match")
        }

        try {
            const { data } = await axios.post('/api/auth/register', inputData)

            if (data?.success === false) {
                setLoading(false)
                return toast.error(data.message)
            }

            toast.success(data?.message)
            localStorage.setItem('chatapp', JSON.stringify(data))
            setAuthUser(data)
    
            navigate('/login')

        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center max-w-full mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-lg
                bg-gray-400 bg-clip-padding
                backdrop-filter backdrop-blur-lg bg-opacity-0'>

                <h1 className='text-3xl font-bold text-center text-gray-300'>
                    Register <span className='text-gray-950'> Chatters </span>
                </h1>

                <form onSubmit={handelSubmit} className='flex flex-col text-black'>

                    <input id='fullname' type='text' onChange={handelInput}
                        placeholder='Enter Full Name' required
                        className='w-full input input-bordered h-10' />

                    <input id='username' type='text' onChange={handelInput}
                        placeholder='Enter UserName' required
                        className='w-full input input-bordered h-10' />

                    <input id='email' type='email' onChange={handelInput}
                        placeholder='Enter email' required
                        className='w-full input input-bordered h-10' />

                    <input id='password' type='password' onChange={handelInput}
                        placeholder='Enter password' required
                        className='w-full input input-bordered h-10' />

                    
                    <input id='confpassword' type='password' onChange={handelInput}
                        placeholder='Enter Confirm password' required
                        className='w-full input input-bordered h-10' />

                    <div className="flex gap-2">
                        <label className="flex gap-2 cursor-pointer">
                            <input type='checkbox'
                                checked={inputData.gender === 'male'}
                                onChange={() => selectGender('male')} />
                            Male
                        </label>

                        <label className="flex gap-2 cursor-pointer">
                            <input type='checkbox'
                                checked={inputData.gender === 'female'}
                                onChange={() => selectGender('female')} />
                            Female
                        </label>
                    </div>

                    <button type='submit'
                        className='mt-4 bg-gray-950 text-white rounded-lg px-4 py-2'>
                        {loading ? "loading.." : "Register"}
                    </button>

                </form>

                <p className='pt-2 text-sm font-semibold text-gray-800'>
                    Already have an account?
                    <Link to='/login' className='underline font-bold ml-1'>
                        Login Now!!
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Register;
