"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";

export default function cvv2() {
  const url_api = process.env.NEXT_PUBLIC_URL_API
  const modal = useRef();
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [IsMessage, setIsMessage] = useState(false)
  const [isNotiCart, setIsNotiCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bins, setBins] = useState(null);
  const [checkBins, setCheckBins] = useState()
  const [countries, setCountries] = useState([]);
  const [selectCountry, setSelectCountry] = useState("AE");
  const [cvv2, setCvv2] = useState([]);
  const [search, setSearch] = useState(false);
  const types = [
    'amex',
    'discover',
    'mastercard',
    'visa',
    'jcb'
  ]
 
  useEffect(() => {
    import("preline");
  }, []);
  useEffect(() => {
    const getCountries = async () => {
      const response = await axios(`${url_api}/api/country`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      });
      setCountries(response.data);
    };
    getCountries();
  }, []);
  useEffect(() => {
    const getCvv2 = async () => {
      try {
        if (checkBins) {
          setSelectCountry(checkBins.country.alpha2)
        }
        const response = await axios(
          `${url_api}/api/cvv2?codeCountry=${selectCountry}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }
        );
        const data = response.data;
        // Set isLoading to false
        setIsLoading(false);
        const fixData = data[0].data;
        if (checkBins) {
          fixData.map((item) => {
          item.Bin = bins
          item.Type = checkBins.scheme
          item.codeCountry = checkBins.country.alpha2
          item.Subtype = `${checkBins?.type? checkBins.type : ''} ${checkBins?.brand? checkBins.brand : '' } ${checkBins?.type && checkBins?.type ? ''  : 'UNKNOW N/A'} `.toUpperCase()
        });
        }
        setCvv2(fixData);
        setBins('')
      } catch (error) {
        setIsLoading(false)
        setSelectCountry("AU");
        setIsMessage(true)
        setCvv2([]);


      }
    };
    getCvv2();
  }, [search]);
  const hanldeClear = () => {
    setIsLoading(!isLoading);
    setCheckBins('')
    setBins("");
    setSelectCountry("00");
    setSearch(!search);
  };
  const hanleSearch = async () => {
      if (bins) {
        try {
          setIsMessage(false)
          setIsLoading(true);
          const res = await axios(`https://lookup.binlist.net/${bins}`);
          setCheckBins(res.data)
          setSearch(!search);
        } catch (error) {
          setIsLoading(true);
          setSelectCountry("AA");
          setSearch(!search);
          setBins('');
        }
      } else {
        setCheckBins('')
        setIsLoading(true);
        setIsMessage(false)
        setSearch(!search);
      }
    
    

  };
  const hanldePopup = () => {
    modal.current.click();
  };
  const hanldeAddCart = (item) => {
    setIsNotiCart(true);
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push(item);

    setQuantityProduct(cart.length);
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <>
      <form
        action=""
        className="max-w-xs md:max-w-3xl lg:max-w-screen-2xl mx-auto my-5   "
      >
        <div className="flex flex-wrap gap-3 md:flex-nowrap lg:flex-nowrap md:gap-0 lg:gap-0">
          <div className="w-full md:w-1/4 lg:w-1/4 md:rounded-tl-md lg:rounded-tl-md  border-gray-300 border p-3">
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[50px]">Bins</p>
              <textarea
                value={bins}
                onChange={(e) => setBins(e.target.value)}
                className="py-2 px-3 block w-full border-gray-200 border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                rows="1"
              ></textarea>
            </div>

            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[50px]">Zips</p>
              <textarea
                className="py-2 px-3 block w-full border-gray-200 border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                rows="1"
              ></textarea>
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[50px]">Bank</p>
              <select
                onClick={hanldePopup}
                className="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm border  focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              >
                <option value="-ALL-">-all-</option>
              </select>
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-light text-sm min-w-[50px]">Bins (8 digit):</p>
              <p className="font-light text-sm min-w-[50px]">
                Search by 8 digits is available for users with a rating of 5
                crab and above.{" "}
                <span className="text-sky-600"> About rating</span>
              </p>
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-light text-sm min-w-[50px]">Card Number:</p>
              <p className="font-light text-sm min-w-[50px]">
                Search by 8 digits is available for users with a rating of 5
                crab and above.{" "}
                <span className="text-sky-600"> About rating</span>
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/4 lg:w-1/4  md:border-l-0 lg:border-l-0 border-gray-300 border p-3">
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">Country</p>
              <select
                value={selectCountry}
                onChange={(e) => setSelectCountry(e.target.value)}
                className="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm border  focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              >
                <option>-all-</option>
                {countries.map((item, index) => (
                  <option className="py-1" value={item[0]} key={index}>
                    {item[1]} 
                    {item[2]}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">State</p>
              <select
                onClick={hanldePopup}
                className="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm border  focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              >
                <option value="-ALL-">-all-</option>
              </select>
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">ZIP</p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">
                Full Address
              </p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">User-Agent</p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">Phone</p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">Email</p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">
                Email password
              </p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">
                Without cvv2
              </p>
              <input type="checkbox" name="" id="" />
            </div>
          </div>
          <div className="w-full md:w-1/4 lg:w-1/4  md:border-l-0 lg:border-l-0 border-gray-300 border p-3">
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">Type</p>
              <select
                onClick={hanldePopup}
                className="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm border  focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              >
                <option value="-ALL-">-all-</option>
              </select>
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">
                Credit/Debit
              </p>
              <select
                onClick={hanldePopup}
                className="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm border  focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              >
                <option value="-ALL-">-all-</option>
              </select>
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">Subtype</p>
              <select
                onClick={hanldePopup}
                className="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm border  focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              >
                <option value="-ALL-">-all-</option>
              </select>
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">Zips</p>
              <textarea
                className="py-2 px-3 block w-full border-gray-200 border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                rows="1"
              ></textarea>
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">Discounted</p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[100px]">
                Only refundable
              </p>
              <input type="checkbox" name="" id="" />
            </div>
          </div>
          <div className="w-full md:w-1/4 lg:w-1/4   md:border-l-0 lg:border-l-0 rounded-tr-md   border-gray-300 border p-3">
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[150px] md:min-w-[50px]">
                Base
              </p>
              <select
                onClick={hanldePopup}
                className="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm border  focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              >
                <option value="-ALL-">-all-</option>
              </select>
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[150px]">DOB</p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[150px]">SSN</p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[150px]">MMN</p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[150px]">IP address</p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[150px]">
                Last Paid Amount
              </p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[150px]">
                Driver License Number
              </p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[150px]">
                Driver License Scan
              </p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[150px]">ATM PIN</p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[150px]">AT&T PIN</p>
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center border-b-[1px] border-b-gray-200 py-2">
              <p className="font-semibold text-sm min-w-[150px]">OTP</p>
              <input type="checkbox" name="" id="" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 py-2 border border-gray-200 border-t-0 items-center justify-center">
          <button
            onClick={hanldeClear}
            type="button"
            className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
          >
            Clear
            <svg
              className="w-4 h-4"
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
                  d="M20.5001 6H3.5"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>{" "}
                <path
                  d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>{" "}
                <path
                  d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <button
            onClick={hanleSearch}
            type="button"
            className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
          >
            Search
            <svg
              className="w-5 h-5"
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
                  stroke="#ffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M11.6702 7.20292C11.2583 7.24656 10.9598 7.61586 11.0034 8.02777C11.0471 8.43968 11.4164 8.73821 11.8283 8.69457L11.6702 7.20292ZM13.5216 9.69213C13.6831 10.0736 14.1232 10.2519 14.5047 10.0904C14.8861 9.92892 15.0644 9.4888 14.9029 9.10736L13.5216 9.69213ZM16.6421 15.0869C16.349 14.7943 15.8741 14.7947 15.5815 15.0879C15.2888 15.381 15.2893 15.8559 15.5824 16.1485L16.6421 15.0869ZM18.9704 19.5305C19.2636 19.8232 19.7384 19.8228 20.0311 19.5296C20.3237 19.2364 20.3233 18.7616 20.0301 18.4689L18.9704 19.5305ZM11.8283 8.69457C12.5508 8.61801 13.2384 9.02306 13.5216 9.69213L14.9029 9.10736C14.3622 7.83005 13.0496 7.05676 11.6702 7.20292L11.8283 8.69457ZM15.5824 16.1485L18.9704 19.5305L20.0301 18.4689L16.6421 15.0869L15.5824 16.1485Z"
                  fill="#ffff"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>
        <div className="flex gap-2 py-2 border border-gray-200 border-t-0 items-center justify-center">
          <p className="text-center font-bold text-red-500 text-sm">
            Please read carefully before buying!
          </p>
        </div>
      </form>
      {isNotiCart && (
        <div className="max-w-screen-2xl mx-auto ">
          <div
            id="dismiss-alert"
            class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-teal-50 border border-teal-200 rounded-md p-4"
            role="alert"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-4 w-4 text-teal-400 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
              </div>
              <div class="ml-3">
                <div class="text-sm text-teal-800 font-medium">
                  The product has been added to cart ({quantityProduct}).{" "}
                  <Link className="underline" href="/cart">
                    {" "}
                    go to cart
                  </Link>
                </div>
              </div>
              <div class="pl-3 ml-auto">
                <div class="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    class="inline-flex bg-teal-50 rounded-md p-1.5 text-teal-500 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-50 focus:ring-teal-600"
                    data-hs-remove-element="#dismiss-alert"
                  >
                    <span class="sr-only">Dismiss</span>
                    <svg
                      class="h-3 w-3"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col max-w-xs lg:max-w-screen-2xl mx-auto my-3 md:max-w-3xl">
        <div className="-m-1.5 overflow-x-auto">
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
                      className=" py-2 text-left text-sm font-medium text-gray-500 "
                    >
                      Bins
                    </th>
                    <th
                      scope="col"
                      className=" py-2 text-left text-sm font-medium text-gray-500 "
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className=" py-2 text-left text-sm font-medium text-gray-500 "
                    >
                      Subtype
                    </th>
                    <th
                      scope="col"
                      className=" py-2 text-left text-sm font-medium text-gray-500 "
                    >
                      Expiry
                    </th>
                    <th
                      scope="col"
                      className=" py-2 w-10 text-left text-sm font-medium text-gray-500 "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="w-10 py-2 text-left text-sm font-medium text-gray-500 "
                    >
                      Country
                    </th>
                    <th
                      scope="col"
                      className=" py-2 text-left w-10 text-sm font-medium text-gray-500 "
                    >
                      State
                    </th>
                    <th
                      scope="col"
                      className=" py-2 text-left text-sm font-medium text-gray-500 "
                    >
                      Full Address
                    </th>
                    <th
                      scope="col"
                      className=" py-2 text-left text-sm font-medium text-gray-500 "
                    >
                      Zip
                    </th>
                    <th
                      scope="col"
                      className=" py-2 text-left text-sm font-medium text-gray-500 "
                    >
                      Extra
                    </th>
                    {/* <th
                      scope="col"
                      className=" py-2 text-left text-sm font-medium text-gray-500 "
                    >
                      Bank
                    </th> */}
                    <th
                      scope="col"
                      className=" py-2 text-left text-sm font-medium text-gray-500 "
                    >
                      Base
                    </th>
                    <th
                      scope="col"
                      className=" py-2 text-left text-sm font-medium text-gray-500 "
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className=" py-2 text-left text-sm font-medium text-gray-500 "
                    >
                      Cart
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {!isLoading ? (
                    <>
                      {cvv2.map((item, index) => {
                        if (index !== 0) {
                          return (
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
                                {types.map((type ,index) => {
                                    if (type === (item.Type).toLowerCase()) {
                                      return (
                                        <Image
                                        src={`/type/${type}.png`}
                                        width={30}
                                        height={30}
                                        alt={type}
                                    />
                                      )
                                    }
                                  })}
                                 
                                 
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
                              <td className="py-2 px-2 w-2   text-left whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <button
                                  onClick={() => hanldeAddCart(item)}
                                  className="block shrink-0 rounded-lg bg-white p-2 text-gray-600 shadow-sm hover:text-gray-700"
                                >
                                  <svg
                                    className="w-6 h-6 text-slate-300"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      strokeWidth="0"
                                    ></g>
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
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
              {isLoading && <Spinner />}
              {IsMessage && <div className="w-full text-sm text-red-400 text-center py-3">No Data</div>}
            </div>
          </div>
        </div>
      </div>
      <nav className="flex justify-end items-center space-x-2 max-w-screen-2xl mx-auto mb-3">
        <a
          className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
          href="#"
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="w-10 h-10 bg-blue-500 text-white p-4 inline-flex items-center text-sm font-medium rounded-full"
          href="#"
          aria-current="page"
        >
          1
        </a>
        <button
                onClick={hanldePopup}
          className="w-10 h-10 text-gray-500 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
          href="#"
        >
          2
        </button>
        <a
          className="w-10 h-10 text-gray-500 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
          href="#"
        >
          3
        </a>
        <a
          className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
          href="#"
        >
          <span className="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </a>
      </nav>
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
