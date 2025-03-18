import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-around items-center text-2xl bg-slate-800 text-white'>
        <div className='font-bold'>
            <span className='text-green-600'>&lt;</span>
            Pass
            <span className='text-green-600'>OP/</span>
            <span className='text-green-600'>&gt;</span>
        </div>
        <ul className='ml-72 flex'>
            <img src="/github.png" alt="github logo" className='w-8 h-8 invert relative top-3.5 left-7' />
            <li className='m-3.5'>
                <a className='m-5 hover:font-bold font-bold text-green-600' href="/">GitHub</a>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
