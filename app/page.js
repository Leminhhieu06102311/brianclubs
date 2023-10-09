"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <>
      <div className="px-3 lg:max-w-screen-2xl mx-auto border border-gray-300 my-10 rounded-md p-4 ">
        <div class="">
          <div class="bg-blue-600 bg-no-repeat bg-cover bg-center p-4 rounded-md text-center">
            <p class="mr-2 inline-block text-white font-semibold ">
            STOP VISITING PHISHING DOMAINS OF THE SHOP! USE OFFICIAL DOMAINS!!!
            </p>
            
          </div>
        </div>
        <div className="border bg-[#f9f3ef] border-gray-300 rounded-md my-3 p-2">
          <h2 className="text-[#061257] text-xl font-semibold">Attention! Official domain list updated:</h2>
          <ul className="py-2">
            <li className="text-lg">https://bclub.cm</li>
            <li className="text-lg">https://bclub.mp</li>
            <li className="text-lg">https://bclub.tk</li>
            <li className="border border-b-gray-300 w-20 my-2"></li>
            <li className="text-lg">https://briansclub.cm</li>
            <li className="text-lg">https://briansclub.mx</li>
            <li className="border border-b-gray-300 w-20 my-2"></li>
            <li className="text-lg">https://briancrabs.de</li>
            <li className="text-lg">https://briancrabs.cm</li>
            <li className="text-lg">https://briancrabs.mx</li>
            <li className="border border-b-gray-300 w-20 my-2"></li>
            <li className="text-xl font-semibold hidden md:block lg:block">http://briansclcfyc5oe34hgxnn3akr4hzshy3edpwxsilvbsojp2gwxr57qd.onion</li>

          </ul>
          <p className="text-xl my-4">All other domains are a scam! Never Google the shop name or you WILL get scammed. No sales in ICQ, Jabber, Telegram or any other messenger.</p>
        </div>
        <div className="flex justify-between px-2">
          <h3 className="text-xl text-sky-600">Fresh Updates & SALE</h3>
          <p>created 1 day, 23 hours ago</p>

        </div>
        <div className="border  border-gray-300 rounded-md my-3 p-2">
          <div className="my-3">
            <p className="">Base name: <span className="text-green-600">0928_US_PHONE_ZIP_EMAIL_IP</span></p>
            <p>Countries: USA [AK, AL, AR, AZ, CA, CO, CT, DC, DE, FL, GA, HI, IA, ID, IL, IN, KS, KY, LA, MA, MD, ME, MI, MN, MO, MS, MT, NC, ND, NE, NH, NJ, NM, NV, NY, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VA, VT, WA, WI, WV, WY], Hong Kong, Canada, South Korea</p>
            <p>Info: Number, Exp Date, CVV2, Name, Address, City, Zip code, Phone, Email, <b>IP</b></p>
            <p>Valid rate: <b>90%</b></p>
            <p>No replacements!</p>
          </div>
          <div className="my-3">
            <p className="">Base name: <span className="text-green-600">0928_US_PHONE_ZIP_EMAIL_IP</span></p>
            <p>Countries: USA [AK, AL, AR, AZ, CA, CO, CT, DC, DE, FL, GA, HI, IA, ID, IL, IN, KS, KY, LA, MA, MD, ME, MI, MN, MO, MS, MT, NC, ND, NE, NH, NJ, NM, NV, NY, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VA, VT, WA, WI, WV, WY], Hong Kong, Canada, South Korea</p>
            <p>Info: Number, Exp Date, CVV2, Name, Address, City, Zip code, Phone, Email, <b>IP</b></p>
            <p>Valid rate: <b>90%</b></p>
            <p>No replacements!</p>
          </div>
          <div className="my-3">
            <p className="">Base name: <span className="text-green-600">0928_US_PHONE_ZIP_EMAIL_IP</span></p>
            <p>Countries: USA [AK, AL, AR, AZ, CA, CO, CT, DC, DE, FL, GA, HI, IA, ID, IL, IN, KS, KY, LA, MA, MD, ME, MI, MN, MO, MS, MT, NC, ND, NE, NH, NJ, NM, NV, NY, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VA, VT, WA, WI, WV, WY], Hong Kong, Canada, South Korea</p>
            <p>Info: Number, Exp Date, CVV2, Name, Address, City, Zip code, Phone, Email, <b>IP</b></p>
            <p>Valid rate: <b>90%</b></p>
            <p>No replacements!</p>
          </div>
        </div>
      </div>

    </>
  );
}
