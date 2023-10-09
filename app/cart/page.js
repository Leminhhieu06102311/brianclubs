'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function cart() {
  useEffect(() => {
    import("preline");
  }, []);
  const modal = useRef();

  const [products,setProduct] = useState([])
  useEffect(() => {
    const getProducts = () => {
      const data = JSON.parse(sessionStorage.getItem('cart'))
      setProduct(data)
    }
    getProducts()
  },[])
 
  const hanldePopup = () => {
    modal.current.click();
  };
  return (
    <>
    <div className="lg:max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Shopping Cart
                  </h2>
                </div>
              </div>
              <div className="flex flex-col max-w-screen-2xl mx-auto my-10">
                <div className="-m-1.5 overflow-x-auto px-4">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th scope="col" className="py-3 pl-4">
                              <div className="flex items-center h-5">
                                <input
                                  id="hs-table-checkbox-all"
                                  type="checkbox"
                                  className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                />
                                <label
                                  htmlFor="hs-table-checkbox-all"
                                  className="sr-only"
                                >
                                  Checkbox
                                </label>
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              Bin
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              Type
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              Subtype
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              Expiry
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              Country
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              State
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              Full Address
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              Zip
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              Extra
                            </th>
                            {/* <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              Bank
                            </th> */}
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              Base
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              Price
                            </th>
                            {/* <th
                              scope="col"
                              className="px-4 py-2 text-left text-sm font-medium text-gray-500 "
                            >
                              Cart
                            </th> */}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <>
                      {products?.map((item, index) => (
                       
                            <tr key={index}>
                              <td className="py-3 w-2 pl-4">
                                <div className="flex items-center h-5">
                                  <input
                                    id="hs-table-checkbox-2"
                                    type="checkbox"
                                    className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  />
                                  <label
                                    htmlFor="hs-table-checkbox-2"
                                    className="sr-only"
                                  >
                                    Checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="py-2 px-2 w-2   text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {item.Bin}
                              </td>
                              <td className="py-2 px-2 w-2   whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <div className="flex justify-center">
                                  {/* <span className="text-sm">?</span> */}
                                  {item.Type === "MASTERCARD" ? (
                                    <Image
                                      src="/type/MASTERCARD.png"
                                      width={30}
                                      height={30}
                                      alt="MASTERCARD"
                                    />
                                  ) : (
                                    <Image
                                      src="/type/VISA.png"
                                      width={30}
                                      height={30}
                                      alt="VISA"
                                    />
                                  )}
                                </div>
                              </td>
                              <td className="py-2 px-2 w-2   text-left whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {item.Subtype}
                              </td>
                              <td className="py-2 px-2 w-2   text-left whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {item.Expiry}
                              </td>
                              <td className="py-2 px-2 w-2  text-left whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {item.Name}
                                {/* <span className="text-red-500"> N/A</span> */}
                              </td>
                              <td className="py-2 px-2 h-28   text-left whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 flex justify-left">
                                <div className=" flex items-center">
                                  {item.Country !== "Unknown" ? (
                                    <img
                                      src={`https://flagsapi.com/${item.codeCountry}/flat/64.png`}
                                      width={30}
                                      height={30}
                                    />
                                  ) : (
                                    <span className="text-sm w-8 justify-center h-6 flex items-center bg-slate-300 rounded-lg">
                                      ?
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-2 px-2   text-left whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {item.State}
                              </td>
                              <td className="py-2 px-2 w-28   text-left whitespace-nowrap text-sm  dark:text-gray-200 text-green-500">
                                {item.FullAddress}
                              </td>
                              <td className="py-2 px-2 w-2   text-left whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {item.Zip}
                              </td>
                              <td className="py-2 px-2 w-2   text-left whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {item.Extra.replace(/\s+/g, " ")
                                  .split(" ")
                                  .map((item) => (
                                    <>
                                      {item} <br />
                                    </>
                                  ))}
                              </td>
                              {/* <td className="py-2 px-2 w-2   text-left whitespace-nowrap text-xs text-gray-800 dark:text-gray-200">
                    {item.Bank}
                     
                      <span className="text-red-500 text-sm">
                        non refundable
                      </span>
                    </td> */}
                              <td className="py-2 px-2 w-2   text-left whitespace-nowrap text-xs text-gray-800 dark:text-gray-200">
                                {item.Base}
                              </td>
                              <td className="py-2 px-2 w-2   text-left whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {item.Price}
                              </td>
                              
                            </tr>
                      ))}
                    </>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end flex-col items-end p-5">
                  <p className="text-red-500 font-semibold py-2">
                    Please read carefully before buying!
                  </p>
                  <div className="border border-gray-300 rounded-md inline-block p-4">
                    <p>
                      <b className="mr-3">Discount:</b> 0.00% (0.00 $)
                    </p>
                    <p>
                      <b className="mr-3">Summary Amount: </b>  {products?.reduce((preValue, currentValue) => {
                        const current = parseFloat((currentValue.Price).replace(/[^0-9.]/g, ""));
                        return preValue + current

                      },0)} $
                    </p>
                  </div>
                  <div className="my-3">
                    <div class="inline-flex gap-x-2">
                      <Link
                        class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                        href="/cvv2"
                      >
                        Continute Shopping
                      </Link>

                      <button
                        onClick={hanldePopup}
                        class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="#fff"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M16.9456 2.84731C18.3542 2.14979 19.0585 1.80104 19.5345 2.11769C20.0104 2.43435 19.9427 3.20671 19.8074 4.75143L19.7724 5.15106C19.7339 5.59003 19.7147 5.80951 19.7834 6.00845C19.852 6.2074 20.0008 6.36329 20.2984 6.67507L20.5694 6.95892C21.6166 8.05609 22.1402 8.60468 21.9676 9.16677C21.795 9.72887 21.0405 9.93221 19.5315 10.3389L19.1411 10.4441C18.7123 10.5597 18.4979 10.6175 18.3269 10.7517C18.156 10.8859 18.0478 11.0814 17.8314 11.4723L17.6344 11.8281C16.873 13.2038 16.4924 13.8916 15.9098 13.9223C15.3272 13.953 14.9285 13.3063 14.1312 12.013L13.925 11.6784C13.6984 11.3108 13.5851 11.1271 13.4108 11.0111C13.2365 10.8951 13.0208 10.86 12.5895 10.7898L12.1968 10.7259C10.6791 10.4789 9.92016 10.3554 9.7327 9.81228C9.54524 9.26918 10.0534 8.66616 11.0696 7.46012L11.3325 7.14811C11.6213 6.80539 11.7657 6.63403 11.8289 6.42812C11.8921 6.22222 11.867 6.00508 11.8168 5.57079L11.7711 5.17542C11.5945 3.64716 11.5062 2.88303 11.9729 2.51664C12.4396 2.15025 13.1523 2.42425 14.5776 2.97224L14.9464 3.11402C15.3514 3.26974 15.554 3.3476 15.7674 3.33634C15.9808 3.32508 16.1809 3.22598 16.5812 3.02776L16.9456 2.84731Z"
                              fill="#fff"
                            />{" "}
                            <g opacity="0.5">
                              {" "}
                              <path
                                d="M9.04452 11.3203C5.99048 13.2697 3.27111 16.7967 2.0908 20.0321C1.70785 21.0818 2.59069 22.0006 3.71668 22.0006H4.75C4.75007 21.6498 4.83224 21.2139 4.95372 20.7564C5.07876 20.2855 5.25886 19.743 5.48334 19.1616C5.93221 17.9992 6.57058 16.6505 7.33621 15.3652C8.09909 14.0845 9.0062 12.8366 10.0012 11.8992C10.0258 11.876 10.0506 11.853 10.0754 11.83C10.052 11.8229 10.0289 11.8157 10.0062 11.8084C9.72191 11.7169 9.36664 11.5713 9.04452 11.3203Z"
                                fill="#fff"
                              />{" "}
                              <path
                                d="M12.0202 12.2173C11.7015 12.4123 11.3705 12.67 11.0298 12.991C10.1729 13.7983 9.34809 14.9188 8.62489 16.1329C7.90444 17.3423 7.30253 18.6146 6.88264 19.7019C6.67275 20.2455 6.51136 20.7351 6.40349 21.1413C6.29223 21.5604 6.25008 21.8464 6.25 22.0006H9.08304C9.08314 20.8766 9.47243 18.7949 10.1769 16.7088C10.6939 15.1781 11.4097 13.5555 12.3322 12.2681L12.0202 12.2173Z"
                                fill="#fff"
                              />{" "}
                              <path
                                d="M13.2982 13.5134C12.6225 14.5571 12.0472 15.8587 11.5981 17.1888C10.9202 19.1961 10.5832 21.1042 10.583 22.0006H11.8718C12.9978 22.0006 13.9043 21.0942 13.9793 19.9804C14.1081 18.0663 14.4036 16.3411 14.7411 15.1142C14.407 14.918 14.1488 14.6602 13.9589 14.4372C13.7399 14.1801 13.5196 13.859 13.2982 13.5134Z"
                                fill="#fff"
                              />{" "}
                            </g>{" "}
                          </g>
                        </svg>
                        Complete Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* modal */}
    <div className="opacity-0 text-center">
        <button
          ref={modal}
          type="button"
          className=" py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
          data-hs-overlay="#hs-sign-out-alert-small-window"
        >
          Open modal
        </button>
      </div>
      <div
        id="hs-sign-out-alert-small-window"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-xs sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800">
            <div className="absolute top-2 right-2">
              <button
                type="button"
                className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-sign-out-alert-small-window"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3.5 h-3.5"
                  width={8}
                  height={8}
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 sm:p-10 text-center overflow-y-auto">
              {/* Icon */}
              <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500 dark:bg-yellow-700 dark:border-yellow-600 dark:text-yellow-100">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </span>
              {/* End Icon */}
              <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                Warning
              </h3>
              <p className="text-gray-500">
                Please activate your account for accessing this page and search
                Bank, State, Type, Credit / Debit ,SubType, Base. Thank You!
              </p>
              <div className="mt-6 gap-2 gap-y-2 flex">
                <div
                  data-hs-overlay="#hs-sign-out-alert-small-window"
                  className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                >
                  Cancel
                </div>
                <Link
                  href="/billing"
                  className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  data-hs-overlay="#hs-sign-out-alert-small-window"
                >
                  Add funds
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
