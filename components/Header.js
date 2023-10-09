"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";
import Link from "next/link";
const links = [
  {
    name: "News",
    path: "/",
  },
  {
    name: "CVV2",
    path: "/cvv2",
  }
];
export default function Header() {
  const url_api = process.env.NEXT_PUBLIC_URL_API

  const pathName = usePathname()
  const router = useRouter()
  const [token,setToken] = useState()
  const [name, setName] = useState()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the item from local storage
      const name = localStorage.getItem('name')
      const token = localStorage.getItem('token');
      if (!token) {
        router.push("/login")
      }
      setToken(token)
      setName(name)
    }
  },[name])
  
const handleLogout = () => {
    axios.get(`${url_api}/api/logout`,{
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then(() => {
      localStorage.removeItem('name')
      localStorage.removeItem('token')
      router.push('/login')
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please try again later!',
      })
    })
    
}
  return (
    <>
      <header className="bg-gray-50">
        <div className="mx-auto max-w-screen-2xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center sm:justify-between sm:gap-4">
            <div>
              <div className="hidden sm:block">
                <nav className="flex gap-6" aria-label="Tabs">
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.path}
                      className={`shrink-0 rounded-lg  p-2 text-sm  font-medium text-sky-600 ${pathName === `${link.path}` ? 'bg-sky-100' : ''}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-between gap-4 sm:justify-end">
              <div className="flex gap-4">
                <Link
                  href="/billing"
                  className=" items-center text-sm shrink-0 rounded-lg bg-white p-2 text-gray-600 shadow-sm hover:text-gray-700 flex gap-2"
                >
                  <span>0 USD</span>
                  <span className="text-sky-600">[ add funds ]</span>
                </Link>

                <Link
                  href="/cart"
                  className="block shrink-0 rounded-lg bg-white p-2 text-gray-600 shadow-sm hover:text-gray-700 flex justify-center"
                >
                  <svg
                    className="w-6 h-6 text-slate-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H13M19 15.5H17"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                      <path
                        d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                      ></path>{" "}
                      <path
                        d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                      ></path>{" "}
                      <path
                        d="M5 6H8M5.5 13H16.0218C16.9812 13 17.4609 13 17.8366 12.7523C18.2123 12.5045 18.4013 12.0636 18.7792 11.1818L19.2078 10.1818C20.0173 8.29294 20.4221 7.34853 19.9775 6.67426C19.5328 6 18.5054 6 16.4504 6H12"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </Link>
              </div>

              <div className="hs-dropdown relative inline-flex">

                <button
                  id="hs-dropdown-basic"
                  type="button"
                  className="hs-dropdown-toggle py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-sky-600 transition-all text-sm"
                  >
                  
                  {name ?? name}
                  <svg
                    className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
                  aria-labelledby="hs-dropdown-basic"
                >
                  <a
                    className="flex items-center gap-x-2 py-2 px-3 rounded-md text-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M6 8H4M6 16H4M6 12H3M7 4.51555C8.4301 3.55827 10.1499 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C10.1499 21 8.4301 20.4417 7 19.4845M14 9.49991C13.5 9.37589 12.6851 9.37133 12 9.37589M12 9.37589C11.7709 9.37742 11.9094 9.36768 11.6 9.37589C10.7926 9.40108 10.0016 9.73666 10 10.6874C9.99825 11.7002 11 11.9999 12 11.9999C13 11.9999 14 12.2311 14 13.3124C14 14.125 13.1925 14.4811 12.1861 14.599C12.1216 14.599 12.0597 14.5991 12 14.5994M12 9.37589L12 8M12 14.5994C11.3198 14.6022 10.9193 14.6148 10 14.4999M12 14.5994L12 16"
                          stroke="#4ade88"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    Lottery $
                  </a>
                  <a
                    className="flex items-center gap-x-2 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#fff"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.12702 6C4.97689 5.41856 4.95943 4.81002 5.07686 4.21964C5.20519 3.57448 5.49065 2.97092 5.90796 2.46243C6.32527 1.95394 6.86154 1.55621 7.46927 1.30448C8.077 1.05275 8.73743 0.954786 9.39207 1.01926C10.0467 1.08374 10.6753 1.30867 11.2223 1.67412C11.5109 1.86698 11.7721 2.09584 12 2.35425C12.2125 2.11335 12.4539 1.89804 12.7197 1.7136C13.2506 1.34528 13.8627 1.11103 14.5038 1.03089C15.145 0.95075 15.7959 1.0271 16.4011 1.25342C17.0063 1.47973 17.5476 1.84928 17.9788 2.33043C18.41 2.81159 18.7183 3.39004 18.8772 4.0163C19.0361 4.64256 19.0409 5.29799 18.8912 5.92652C18.8854 5.95109 18.8793 5.97558 18.873 6H19C20.6569 6 22 7.34315 22 9V10C22 11.3062 21.1652 12.4175 20 12.8293V20C20 21.6569 18.6569 23 17 23H7C5.34315 23 4 21.6569 4 20V12.8293C2.83481 12.4175 2 11.3062 2 10V9C2 7.34315 3.34315 6 5 6H5.12702ZM10.7528 4.06311C10.9068 4.3512 10.9999 4.6728 11 4.99947V6H7.28241C7.20504 5.86711 7.14307 5.7252 7.09809 5.57694C7.00322 5.26417 6.98694 4.93283 7.0507 4.61226C7.11447 4.2917 7.2563 3.99181 7.46365 3.73915C7.671 3.4865 7.93746 3.28888 8.23942 3.1638C8.54139 3.03872 8.86954 2.99005 9.19481 3.02208C9.52008 3.05412 9.83243 3.16588 10.1042 3.34747C10.376 3.52905 10.5987 3.77485 10.7528 4.06311ZM13 21H17C17.5523 21 18 20.5523 18 20V13H13V21ZM11 13V21H7C6.44772 21 6 20.5523 6 20V13H11ZM13 11H19C19.5523 11 20 10.5523 20 10V9C20 8.44772 19.5523 8 19 8H13V11ZM11 8V11H5C4.44772 11 4 10.5523 4 10V9C4 8.44772 4.44772 8 5 8H11ZM13 6H16.7176C16.8153 5.83225 16.8882 5.65051 16.9334 5.46036C17.0078 5.14806 17.0054 4.8224 16.9265 4.51123C16.8475 4.20006 16.6944 3.91264 16.4801 3.67357C16.2658 3.43449 15.9969 3.25088 15.6962 3.13843C15.3955 3.02598 15.072 2.98804 14.7535 3.02786C14.4349 3.06768 14.1308 3.18407 13.867 3.36708C13.6032 3.55009 13.3877 3.79427 13.2389 4.07873C13.0903 4.3629 13.0001 4.6793 13 5V6Z"
                          fill="#ff8e24"
                        ></path>{" "}
                      </g>
                    </svg>
                    My Gift
                  </a>
                  <a
                    className="flex items-center gap-x-2 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <rect
                          x="5"
                          y="4"
                          width="14"
                          height="17"
                          rx="2"
                          stroke="#222222"
                        ></rect>{" "}
                        <path
                          d="M9 9H15"
                          stroke="#222222"
                          strokeLinecap="round"
                        ></path>{" "}
                        <path
                          d="M9 13H15"
                          stroke="#222222"
                          strokeLinecap="round"
                        ></path>{" "}
                        <path
                          d="M9 17H13"
                          stroke="#222222"
                          strokeLinecap="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    Orders
                  </a>
                  <button
                  onClick={() => handleLogout()}
                    className="flex items-center gap-x-2 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M10 12H20M20 12L17 9M20 12L17 15"
                          stroke="#1C274C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17"
                          stroke="#1C274C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="bg-gradient-to-r from-red-500 via-purple-400 to-blue-500 ">
        <div className=" p-3 sm:px-6 lg:px-8 mx-auto  max-w-screen-2xl">
          <div className="grid justify-center md:grid-cols-2 md:justify-between md:items-center gap-2">
            <div className="text-center md:text-left">
              <p className="text-sm text-white/[.8]  tracking-wider">
                Your account is inactive. For activation you need{" "}
                <span className="text-sky-600">to top up your balance.</span>
              </p>
              <p className="mt-1 text-white text-sm font-medium">
                Attention: Not activated accounts for more than 5 days will be
                deleted automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
