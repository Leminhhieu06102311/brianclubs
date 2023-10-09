"use client";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import axios from "axios";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function billing() {
  const url_api = process.env.NEXT_PUBLIC_URL_API

  const [codePay, setCodePay] = useState()
  const [token,setToken] = useState()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the item from local storage
      const token = localStorage.getItem('token');
      setToken(token)
    }
  },[])
  const getCodePay = async (nameSystem) => {
    axios.get(`${url_api}/api/wallet?system=${nameSystem}`,{
      headers: {Authorization: `Bearer ${token}`}
    }).then((res) => {
        const data = res.data
        setCodePay(data)

    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please try again later!',
      })
    })
   
  }
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <>
      <div className="max-w-screen-2xl mx-auto border-gray-200 border rounded-md my-10 p-5">
        <div className=" border border-gray-300 inline-block p-5 rounded-md">
          <div>
            <ul>
              <li className="text-sky-600 text-sm font-bold my-2">
                - Minimum amount to deposit:{" "}
                <span className="text-black">2 USD</span>
              </li>
              <li className="text-sky-600 text-sm font-bold my-2">
                - Get <span className="text-red-500">10%</span> bonus on every
                deposit over $500
              </li>
              <li className="text-sky-600 text-sm font-bold my-2">
                - Processing fee: <span className="text-black">4%</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-sky-600 font-bold text-sm text-center my-5">
          Never pay twice to the same crypto address.{" "}
          <span className="text-black">Always get a new address.</span> One
          address - one deposit!
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <div className="flex flex-col items-center gap-2 justify-between">
            <Image
              src="/billing/bitcoin.gif"
              alt="bitcoin"
              width={100}
              height={30}
            />
            <button
              type="button"
              onClick={() => getCodePay('bitcoin')}
              className="py-2 px-14 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            >
              Deposit
            </button>
          </div>
          <div className="flex flex-col items-center gap-2 justify-between">
            <Image
              src="/billing/litecoin.png"
              alt="bitcoin"
              width={100}
              height={30}
            />
            <button
              onClick={() => getCodePay('litecoin')}

              type="button"
              className="py-2 px-14 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            >
              Deposit
            </button>
          </div>
          <div className="flex flex-col items-center gap-2 justify-between">
            <Image
              src="/billing/dash_logo.png"
              alt="bitcoin"
              width={100}
              height={30}
            />
            <button
              onClick={() => getCodePay('dash')}
              type="button"
              className="py-2 px-14 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            >
              Deposit
            </button>
          </div>
          <div className="flex flex-col items-center gap-2 justify-between">
            <Image
              src="/billing/xmr_logo.png"
              alt="bitcoin"
              width={100}
              height={30}
            />
            <button
              type="button"
              onClick={() => getCodePay('monero')}
              className="py-2 px-14 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            >
              Deposit
            </button>
          </div>
        </div>
        <div className="flex justify-center my-3">
          <p className="font-medium w-3/4 text-center text-sm">
            <span className="text-black font-bold">
              Unconfirmed Transaction
            </span>{" "}
            - Bitcoin, Litecoin, Dash & Monero transactions should receive{" "}
            <span className="text-black font-bold"> 7 confirmations </span>to be
            posted. Confirmations on blockchain networks can take from 15
            minutes and up to 1 day If you send It without a fee.
          </p>
        </div>
        <Suspense fallback={<LoadingSkeleton />} >
           <div className={`flex gap-3 items-center justify-center my-5 `}>
             {codePay ? (
              <>
              <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${codePay.codePay}`}
              width={150}
              height={150}
              alt="qrcode"
            />
            <p>{codePay.codePay}</p>
              </>
             ) : (
              ''
             )}
           </div>
           </Suspense>
       
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto my-10">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        System
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        {" "}
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        {" "}
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        {" "}
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        {" "}
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        Bitcoin
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        0 USD
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        Unconfirmed Transaction (
                        3JodhB4uF3u4GYCNLq1UmuNS42dewSHYRY )
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {" "}
                        2023-09-28 13:16
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <button>
                          <svg
                            className="w-6 h-6"
                            viewBox="0 -0.5 25 25"
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
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.30524 15.7137C6.4404 14.8306 5.85381 13.7131 5.61824 12.4997C5.38072 11.2829 5.50269 10.0233 5.96924 8.87469C6.43181 7.73253 7.22153 6.75251 8.23924 6.05769C10.3041 4.64744 13.0224 4.64744 15.0872 6.05769C16.105 6.75251 16.8947 7.73253 17.3572 8.87469C17.8238 10.0233 17.9458 11.2829 17.7082 12.4997C17.4727 13.7131 16.8861 14.8306 16.0212 15.7137C14.8759 16.889 13.3044 17.5519 11.6632 17.5519C10.0221 17.5519 8.45059 16.889 7.30524 15.7137V15.7137Z"
                                stroke="#028ed5"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>{" "}
                              <path
                                d="M11.6702 7.20292C11.2583 7.24656 10.9598 7.61586 11.0034 8.02777C11.0471 8.43968 11.4164 8.73821 11.8283 8.69457L11.6702 7.20292ZM13.5216 9.69213C13.6831 10.0736 14.1232 10.2519 14.5047 10.0904C14.8861 9.92892 15.0644 9.4888 14.9029 9.10736L13.5216 9.69213ZM16.6421 15.0869C16.349 14.7943 15.8741 14.7947 15.5815 15.0879C15.2888 15.381 15.2893 15.8559 15.5824 16.1485L16.6421 15.0869ZM18.9704 19.5305C19.2636 19.8232 19.7384 19.8228 20.0311 19.5296C20.3237 19.2364 20.3233 18.7616 20.0301 18.4689L18.9704 19.5305ZM11.8283 8.69457C12.5508 8.61801 13.2384 9.02306 13.5216 9.69213L14.9029 9.10736C14.3622 7.83005 13.0496 7.05676 11.6702 7.20292L11.8283 8.69457ZM15.5824 16.1485L18.9704 19.5305L20.0301 18.4689L16.6421 15.0869L15.5824 16.1485Z"
                                fill="#028ed5"
                              ></path>{" "}
                            </g>
                          </svg>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        Bitcoin
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        0 USD
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        Unconfirmed Transaction (
                        3JodhB4uF3u4GYCNLq1UmuNS42dewSHYRY )
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {" "}
                        2023-09-28 13:16
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <button data-hs-overlay="#hs-notifications">
                          <svg
                            className="w-6 h-6"
                            viewBox="0 -0.5 25 25"
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
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.30524 15.7137C6.4404 14.8306 5.85381 13.7131 5.61824 12.4997C5.38072 11.2829 5.50269 10.0233 5.96924 8.87469C6.43181 7.73253 7.22153 6.75251 8.23924 6.05769C10.3041 4.64744 13.0224 4.64744 15.0872 6.05769C16.105 6.75251 16.8947 7.73253 17.3572 8.87469C17.8238 10.0233 17.9458 11.2829 17.7082 12.4997C17.4727 13.7131 16.8861 14.8306 16.0212 15.7137C14.8759 16.889 13.3044 17.5519 11.6632 17.5519C10.0221 17.5519 8.45059 16.889 7.30524 15.7137V15.7137Z"
                                stroke="#028ed5"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>{" "}
                              <path
                                d="M11.6702 7.20292C11.2583 7.24656 10.9598 7.61586 11.0034 8.02777C11.0471 8.43968 11.4164 8.73821 11.8283 8.69457L11.6702 7.20292ZM13.5216 9.69213C13.6831 10.0736 14.1232 10.2519 14.5047 10.0904C14.8861 9.92892 15.0644 9.4888 14.9029 9.10736L13.5216 9.69213ZM16.6421 15.0869C16.349 14.7943 15.8741 14.7947 15.5815 15.0879C15.2888 15.381 15.2893 15.8559 15.5824 16.1485L16.6421 15.0869ZM18.9704 19.5305C19.2636 19.8232 19.7384 19.8228 20.0311 19.5296C20.3237 19.2364 20.3233 18.7616 20.0301 18.4689L18.9704 19.5305ZM11.8283 8.69457C12.5508 8.61801 13.2384 9.02306 13.5216 9.69213L14.9029 9.10736C14.3622 7.83005 13.0496 7.05676 11.6702 7.20292L11.8283 8.69457ZM15.5824 16.1485L18.9704 19.5305L20.0301 18.4689L16.6421 15.0869L15.5824 16.1485Z"
                                fill="#028ed5"
                              ></path>{" "}
                            </g>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="hs-notifications"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700 p-2">
            <h2 className="p-3 font-semibold text-lg">Payment Details</h2>
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="border overflow-hidden dark:border-gray-700 ">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 border border-l-gray-300 border-r-0 border-b-0 border-t-0">
                            Payment System
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          Bitcoin Merchant
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 border border-l-gray-300 border-r-0 border-b-0 border-t-0">
                          Amount
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          0 USD
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 border border-l-gray-300 border-r-0 border-b-0 border-t-0">
                          Total Amount
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          0 USD
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 border border-l-gray-300 border-r-0 border-b-0 border-t-0">
                          Rate
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          0 USD
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
              <button
                type="button"
                className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-notifications"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
