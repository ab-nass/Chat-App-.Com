import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import   axios from 'axios';
import {toast} from 'react-toastify';
import {useAuth} from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
   

  const navigate = useNavigate();
  const  {authUser} = useAuth();
  const [searchInput , setSearchInput] = useState("");
  const [searchUser , setSearchuser] = useState("");
  const [loading, setLoading] = useState(false)


  const handelSearchSubmit = async(e)=> {

   e.preventDefault();
   setLoading(true)
   try {
    
   const search = await axios.get(`/api/user/search?search=${searchInput}`);
            const data = search.data;
     if(data.success === false) {

      setLoading(false)
      console.log(data.message);
      
     }
    setLoading(false)
    if(data.loading === 0){
      toast.info("User Not Found")
    } else {
      setSearchuser(data)
    }
    
   } catch (error) {
      
     setLoading(false)
    console.log(error);
   }
  }
console.log(searchUser);



  return (
    <>
    <div className='h-full w-auto px-1'>


   <div className='flex justify-between gap-2'>

   <form   onSubmit={handelSearchSubmit} className='w-auto flex items-center justify-between bg-white rounded-full'>

    
    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type='text'
                        className='px-4 w-auto bg-transparent  outline-none rounded-full text-black'
                        placeholder='search user'
                    />
    

    <button className='btn btn-circle bg-sky-700 hover:bg-gray-950'>
        
        <FaSearch />
         </button>
         
           
   </form>

  <img
  onClick={() => navigate(`/profile/${authUser?._id}`)}
  src={authUser?.profilepic}
  onError={(e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = `https://ui-avatars.com/api/?name=${authUser?.username || "User"}&background=random`;
  }}
  alt="profile"
  className="self-center h-12 w-12 rounded-full hover:scale-110 cursor-pointer"
/>


   </div>




 <div className='divider px-3'></div>
 {searchUser ?.length > 0}

    </div>
    
    
    
    
    
    
    
    
    
    </>
  )
}

export default Sidebar