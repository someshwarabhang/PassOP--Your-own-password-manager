import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy as faCopyRegular } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import see from "../assets/icons/see.png";
import eyecross from "../assets/icons/eyecross.png";



const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let password = localStorage.getItem("password")
        if (password) {
            setPasswordArray(JSON.parse(password))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }


    const [show, setShow] = useState(false);

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src);
        if (ref.current.src.includes(see)) {
            ref.current.src = eyecross;
            passwordRef.current.type = "password"
        }
        else { ref.current.src = see;
             passwordRef.current.type = "text" }
    }





    const savePassword = () => {
        if (!form.site.trim() || !form.username.trim() || !form.password.trim()) {
            alert("Please fill all fields before saving!");
            return;
        }
        const newEntry = { ...form, id: uuidv4() };
        const updatedArray = [...passwordArray, newEntry];
        setPasswordArray(updatedArray);
        localStorage.setItem("password", JSON.stringify(updatedArray));
        setform({ site: "", username: "", password: "" });
        toast.success('Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }


    const deletePassword = (id) => {
        console.log("Deleting password with unique id", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id != id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id != id)))
            toast.success('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }

        // console.log([...passwordArray, form])
    }

    const editPassword = (id) => {
        console.log("Editing password with unique id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id != id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <div>
                <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
            </div>

            <div className="p-2 md:p-0 md:mycontainer min-h-[90vh]">
                <h1 className='text-4xl text font-bold text-center '>
                    <span className='text-teal-900'>&lt;</span>
                    Pass
                    <span className='text-teal-900'>OP/&gt;</span>
                </h1>
                <p className='text-teal-900 text-lg text-center'>Your own password manager</p>


                <div className=" flex flex-col  p-4 text-black gap-5 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' type="text" name='site' className='rounded-full border border-teal-600 w-full p-4 py-1' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' type="text" name='username' className='rounded-full border border-teal-600 w-full p-4 py-1' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' type="password" name='password' className='rounded-full border border-teal-600 w-full p-4 py-1' />
                            <span className='absolute right-[0px] top-[-3px]  cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={40} src={eyecross} alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-teal-200 rounded-full px-8 py-2 w-fit hover:bg-teal-300 gap-3 font-semibold border border-teal-700'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-3'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No password to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-9">
                        <thead className=' bg-teal-200 text-black'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-teal-50'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' py-2 border border-gray-200 text-center'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='iconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <FontAwesomeIcon icon={faCopyRegular} style={{ "Width": "18px", "height": "18px", "paddingTop": "4px", "paddingLeft": "4px" }} />

                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-gray-200 text-center '>{item.username}
                                        <div className='flex items-center justify-center'>
                                            <div className='iconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <FontAwesomeIcon icon={faCopyRegular} style={{ "Width": "18px", "height": "18px", "paddingTop": "4px", "paddingLeft": "4px" }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-gray-200 text-center '><span><td>{'*'.repeat(item.password.length)}</td></span>
                                        <div className='flex items-center justify-center'>
                                            <div className='iconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <FontAwesomeIcon icon={faCopyRegular} style={{ "Width": "18px", "height": "18px", "paddingTop": "4px", "paddingLeft": "4px" }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-gray-200 text-center '>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }} ><FontAwesomeIcon icon={faPenToSquare} />
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}><FontAwesomeIcon icon={faTrash} />
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
