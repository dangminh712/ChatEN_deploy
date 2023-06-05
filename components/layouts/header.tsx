
import { useEffect, useState } from "react";

const Header = () => {
    const [login, setLogin] = useState<string | null | undefined>();
    const [username, setUsername] = useState<string | null | undefined>();
    const handleLogout = ()=>{
        sessionStorage.clear()
        window.location.href='/ '
    }
    useEffect(() => {
        setLogin(() => sessionStorage.getItem("Login"));
        setUsername(() => sessionStorage.getItem("Username"));
     }, []);
    return (
        <nav className="w-full bg-white border-gray-200 dark:bg-gray-900 h-[10vh] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                <a href="/" className="flex items-center">
                    <img src="https://cdn-icons-png.flaticon.com/256/25/25694.png" className="h-10 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <div className="flex items-center md:order-2">
                  
                    {(login ===undefined||login==='false'||login===null) ? (
                        <div>
                        <a href="/login" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 hover:border-[2px] border-[2px] hover:border-blue-500">Login</a>
                        <a href="/signup" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</a>
                    </div>
                    ) : (
                        <div>
                            <b className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Hi,{username}</b>
                            <button onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</button>
                        </div>
                    )}

                </div>
                <div id="mega-menu" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
                        <li>
                            <a href="/" className="block py-2 pl-3 pr-4 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</a>
                        </li>
                        
                        <li>
                            <a href="/chat" className="block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Chat</a>
                        </li>
                        <li>
                            <a href="/voice" className="block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Voice</a>
                        </li>
                        <li>
                            <a href="/flipvocab" className="block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">FlipVocab</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )

}
export default Header;