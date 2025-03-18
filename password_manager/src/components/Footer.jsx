import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col bg-slate-800 text-white fixed bottom-0 w-full'>
            <div>
                <nav className='flex justify-around items-center text-2xl '>
                    <div className='font-bold'>
                        <span className='text-green-600'>&lt;</span>
                        Pass
                        <span className='text-green-600'>OP/</span>
                        <span className='text-green-600'>&gt;</span>
                    </div>
                </nav>
            </div>
            <div className='flex justify-center items-center'>
                Created with <img src="/love.png" className='w-10' alt="Love" /> By Mehak
            </div>
        </div>
    )
}

export default Footer
