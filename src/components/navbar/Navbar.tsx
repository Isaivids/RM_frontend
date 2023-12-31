import React from 'react'
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='flex w-full align-items-center justify-content-between teal-500 p-3 text-50 text-lg font-bold bg-blue-600'>
        <Link to="/" className='text-white'>RankMe</Link>
        <FaUser />
    </div>
  )
}

export default Navbar