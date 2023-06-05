import { login } from '@/types/typechat';
import axios from 'axios';
import React, { useRef } from 'react';
import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs';

const Login = () => {
    if (typeof window == 'undefined') {
        return
      }
      
  const username = useRef<any>("");
  const password = useRef<any>("");
  const url = process.env.URL_APP;

  const handleClickSignIn = async () => {
    const login: login = {
      Username: username.current?.value,
      Password: password.current?.value
    };
    await axios.post(`${url}Auth/signIn`, login).then((result) => {
      sessionStorage.setItem("Login", result.data);
      sessionStorage.setItem("Username", login.Username);
    }).then(() => window.location.href = '/');
  };

  return (
    <div className="bg-[#d7e0e6] flex flex-col items-center justify-center min-h-screen md:py-2">
      <main className="flex items-center w-full px-2 md:px-20">
        <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
          <p className='text-6xl text-blue-500 font-bold'>ChatEN</p>
          <p className='font-medium text-lg leading-1 text-pink-400'>Explore your interests, meet new friends &amp; expand your horions</p>
        </div>

        <div className="bg-[#3f83f8] rounded-2xl shadow-2xl flex flex-col w-full md:w-2/5 items-center max-w-4xl transition duration-1000 ease-out">
          <h2 className='p-5 text-3xl font-bold text-[white]'>ChatEN</h2>
          <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
          <h3 className='text-x text-white pt-2 font-[800]'>Sign In!</h3>
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

          <div className='flex flex-col items-center justify-center'>
            <input type='username' className='text-[black] bg-[white] font-[600] rounded-2xl px-2 py-1 w-4/5 md:w-full border-[2px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Username' ref={username}></input>
            <input type="password" className='text-[black] bg-[white] font-[600] text-[12] rounded-2xl px-2 py-1 w-4/5 md:w-full border-[2px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Password' ref={password}></input>
            <button onClick={handleClickSignIn} className='rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md border-[2px] hover:text-blue-400 hover:bg-white hover:border-blue-400 hover:border-[2px] transition duration-200 ease-in'>
              Sign In
            </button>
          </div>

          <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
          <p className='text-blue-400 mt-4 text-sm'>Don&apos;t have an account?</p>
          <p className='text-white mb-4 text-sm font-medium cursor-pointer' onClick={() => window.location.href='/signup'}>Create a New Account?</p>
        </div>
      </main>
    </div>
  );
};

export default Login;
