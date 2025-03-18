import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const ref = useRef()
    const passwordRef = useRef()
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showpassword = () => {
        // alert("show the password")

        passwordRef.current.type = "text"
        if (ref.current.src.includes("/hidden.png")) {
            ref.current.src = "eye.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "hidden.png"
            passwordRef.current.type = "password"
        }
    }

    const savePassword = () => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
                setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
                localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
                console.log([...passwordArray, form])
                toast.success('Password Saved!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setform({ site: "", username: "", password: "" })
            }
            else{
                toast.success('Error: Password Not Saved!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }

    }


    const deletePassword = (id)=>{
        toast.success('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        // console.log("Deleting password with id", id)
        // let c = confirm("Do you really want to delete this password?");
        // if(c){
            setpasswordArray(passwordArray.filter(item=>item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)))
        // }
    }

    const editPassword = (id)=>{
        setform(passwordArray.filter(i=>i.id === id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copied!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }


    return (
        <div>
            // <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className=" min-h-[86vh] absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(144,238,144,.5)_100%)]"></div>

            <div className="mx-auto max-w-4xl mt-8">
                <h1 className='text-black font-bold text-4xl text-center'>
                    <span className='text-green-600'>&lt;</span>
                    Pass
                    <span className='text-green-600'>OP/</span>
                    <span className='text-green-600'>&gt;</span>
                </h1>
                <p className='text-center text-lg text-green-800'>Your Own Password Manager</p>
                <div className='text-black flex flex-col p-4 gap-8 items-center'>

                    <input value={form.site} onChange={handleChange} className='rounded-full bg-white border border-green-500 w-full px-4 py-1' type="text" name='site' placeholder='Enter website URL' />

                    <div className='flex w-full gap-8'>

                        <input value={form.username} onChange={handleChange} className='rounded-full bg-white border border-green-500 w-full px-4 py-1' type="text" name='username' placeholder='Enter Username' />

                        <div className='relative flex'>

                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full bg-white border border-green-500 w-full px-4 py-1' type="password" name='password' placeholder='Enter Password' />

                            <span className='absolute right-3 top-1.5 cursor-pointer' onClick={showpassword}>
                                <img ref={ref} src="/hidden.png" alt="show" className='w-6' />
                            </span>
                        </div>

                    </div>
                    <button className='flex justify-center items-center bg-green-500 rounded-full px-full  py-2 w-1/6 border hover:bg-green-400 border-green-700 gap-1' onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </div>

                <div>
                    <h2 className='text-2xl font-black py-4'>Your Saved Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table class="table-auto w-full rounded-lg overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center py-2 border border-white'>
                                            <div  className='flex items-center justify-center gap-1.5'>
                                                <a href={item.site} target='_blank'> {item.site}</a>
                                                <div className='hover:cursor-pointer' onClick={() => { copyText(item.site) }} >
                                                    <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center gap-1.5'>
                                                {item.username}
                                                <div className='hover:cursor-pointer' onClick={() => { copyText(item.username) }} >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                                </div>
                                            </div>


                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center gap-1.5'>
                                                {"*".repeat(item.password.length)}
                                                <div className='hover:cursor-pointer' onClick={() => { copyText(item.password)}} >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                                </div>
                                            </div>

                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <span className='hover:cursor-pointer' onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover">
                                            </lord-icon>
                                            </span>
                                            <span className='hover:cursor-pointer' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover">
                                            </lord-icon>
                                            </span>

                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>

            </div>
        </div>
    )
}

export default Manager
