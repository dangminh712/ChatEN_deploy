import { login } from '@/types/typechat';
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import React, { useRef, useState } from 'react'
import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
const SignUpForm = () => {
    const repassword = useRef<any>('')
    const username = useRef<any>('');
    const password = useRef<any>('');
    const [isCorrect,setCorrect]= useState<boolean>(true);
    const [eyePass,setEyePass]= useState<boolean>(false); 
    const [eyeRepass,setEyeRepass]= useState<boolean>(false); 
    const url = process.env.URL_APP;

    const handleClickSignUp = async () => {
        if(password.current.value===repassword.current.value){
           
            const login: login = {
                Username: username.current?.value,
                Password: password.current?.value
            }
            await axios.post(`${url}Auth/signUp`, login).then((result) => {
                if(result.data==='false') {setCorrect(false)}
                else{
                    window.location.href='/login'
                }
            })
        }
        else{
            setCorrect(false);
        }
       
    }
    return (
        <div className="bg-[#d7e0e6] flex flex-col items-center justify-center min-h-[90vh] md:py-2">
            <main className="flex items-center w-full px-2 md:px-20">
                <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
                    <p className='text-6xl text-blue-500 font-bold'>ChatEN</p>
                    <p className='font-medium text-lg leading-1 text-pink-400'>Explore your interests, meet new friends & expand your horions</p>
                </div>
                <div className="bg-blue-400 text-white rounded-2xl shadow-2xl  flex flex-col w-full  md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in">
                    <h2 className='p-3 text-3xl font-bold text-white'>ChatEN</h2>
                    <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
                    <h3 className='text-xl font-semibold text-white pt-2'>Create Account!</h3>
                    <div className='flex space-x-2 m-4 items-center justify-center'>
                        <div className="socialIcon">
                            <BsFacebook className='text-[#817c7c]' />
                        </div>
                        <div className="socialIcon">
                            <BsGithub className='text-[#817c7c]' />
                        </div>
                        <div className="socialIcon">
                            <BsGoogle className='text-[#817c7c]' />
                        </div>
                    </div>
                    {/* Inputs */}
                    <div className='flex flex-col items-center justify-center mt-2 w-[300px] '>
                        <div className='flex w-[300px]'>
                            <input type='username' className=' text-black rounded-2xl px-2 py-1 w-[250px]  border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0 bg-white' placeholder='Username' ref={username}></input>
                        </div>
                        <div className='flex w-[300px] '>
                            <input type={eyePass ===false ? "password":"text"} className='text-black rounded-2xl px-2 py-1 w-[250px]  border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0 bg-white' placeholder='Password' ref={password}></input>
                            <button onClick={()=>{setEyePass(!eyePass)}}>
                                {eyePass===true ? (
                                    <div>
                                         <AiFillEye className='pl-[5px] text-[30px]' />
                                    </div>
                                ) :(
                                    <div>
                                          <AiFillEyeInvisible className='pl-[5px] text-[30px]' />
                                    </div>
                                )}
                               
                              
                            </button>
                        </div>
                        <div className='flex w-[300px]'  >
                            <input type={eyeRepass ===false ? "password":"text"} className='text-black rounded-2xl px-2 py-1 w-[250px]  border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0 bg-white' placeholder='Repassword' ref={repassword}></input>
                            <button onClick={()=>setEyeRepass(!eyeRepass)}>
                            {eyeRepass===true ? (
                                    <div>
                                         <AiFillEye className='pl-[5px] text-[30px]' />
                                    </div>
                                ) :(
                                    <div>
                                          <AiFillEyeInvisible className='pl-[5px] text-[30px]' />
                                    </div>
                                )}
                            </button>
                        </div>
                        {isCorrect === false &&( <div className='flex justify-center w-full m-4'>
                           <b className='px-4 text-[#f53b3b]'>Password and Repassword incorrect</b>
                        </div>)}
                       
                        <button onClick={handleClickSignUp} className='rounded-2xl m-4 text-blue-400 bg-white w-3/5 px-4 py-2 border-[2px] boder-[white] shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in'>
                            Sign Up
                        </button>
                    </div>
                    <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
                    <p className='text-white mt-4 text-sm'>Already have an account?</p>
                    <p className='text-white mb-4 text-sm font-medium cursor-pointer' onClick={() => window.location.href = '/login'}>Sign In to your Account?</p>
                </div>
            </main>
        </div>

    )
}

export default SignUpForm;
