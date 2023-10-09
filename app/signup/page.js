'use client'
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from 'sweetalert2'
export default function signup() {
  const url_api = process.env.NEXT_PUBLIC_URL_API
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = async () => {
    try {
      // Gửi yêu cầu đăng nhập và nhận token từ API
      const response = await axios.post(
        `${url_api}/api/signup`,
        {
          username: username,
          email: email,
          password: password,
        }
      );
      // Đăng nhập thành công, điều hướng đến trang chính hoặc trang tiếp theo
      Swal.fire(
        'Sign up success!',
        'You clicked the button!',
        'success'
      )
      router.push("/login");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      })
    }
  };
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-white" style={{backgroundImage: 'url("/login/mockup-1.jpg")', backgroundSize: 'cover'}}>
      <main className="w-full max-w-md mx-auto  pt-52">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm  ">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 ">Sign up</h1>
            <p className="mt-2 text-sm text-gray-600 ">
              Already have an account?
              <Link className="text-blue-600 decoration-2 hover:underline font-medium ml-1" href="/login">
                 Sign in here
              </Link>
              
            </p>
          </div>

          <div className="mt-5">
            


              <div className="grid gap-y-4">
                <div>
                  <label for="email" className="block text-sm mb-2 ">Username</label>
                  <div className="relative">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="email" name="email" className=" border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500   " required aria-describedby="email-error"/>
                    <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                      <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                      </svg>
                    </div>
                  </div>
                  <p className="hidden text-sm text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                </div>
                
                <div>
                  <label for="password" className="block text-sm mb-2 ">Email</label>
                  <div className="relative">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="password" name="password" className=" border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500   " required aria-describedby="password-error"/>
                    <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                      <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                      </svg>
                    </div>
                  </div>
                  <p className="hidden text-sm text-red-600 mt-2" id="password-error">8+ characters required</p>
                </div>
                <div>
                  <label for="confirm-password" className="block text-sm mb-2 "> Password</label>
                  <div className="relative">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="confirm-password" name="confirm-password" className=" border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500   " required aria-describedby="confirm-password-error"/>
                    <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                      <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                      </svg>
                    </div>
                  </div>
                  <p className="hidden text-sm text-red-600 mt-2" id="confirm-password-error">Password does not match the password</p>
                </div>

                <div className="flex items-center">
                  <div className="flex">
                    <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500   "/>
                  </div>
                  <div className="ml-3">
                    <label for="remember-me" className="text-sm ">I accept the <a className="text-blue-600 decoration-2 hover:underline font-medium" href="#">Terms and Conditions</a></label>
                  </div>
                </div>

                <button onClick={() => handleSignup()} type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm ">Sign up</button>
              </div>
          </div>  
        </div>
      </div>
    </main>
    </div>
    )
}