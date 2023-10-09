"use client";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Swal from "sweetalert2";

export default function login() {
  const url_api = process.env.NEXT_PUBLIC_URL_API
  const router = useRouter();
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };
  const handleLogin = async () => {
    if (recaptchaValue) {
      // Gửi yêu cầu đăng nhập với recaptchaValue bằng cách sử dụng API
      try {
        // Gửi yêu cầu đăng nhập và nhận token từ API
        const response = await axios.post(`${url_api}/api/login`, {
          username: username,
          password: password,
          recaptchaValue: recaptchaValue
        });
        const { token, user } = response.data;
        // Lưu token vào header Bearer
        axios.defaults.headers.common["Authorization"] = `Bearer ${token[0]}`;

        // Lưu token vào state hoặc local storage để sử dụng sau này
        localStorage.setItem("name", user.username);
        localStorage.setItem("token", token[0]);
        router.push('/')
        // Đăng nhập thành công, điều hướng đến trang chính hoặc trang tiếp theo
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your account and password are incorrect',
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter captcha!',
      })
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-white"
      style={{
        backgroundImage: 'url("/login/mockup-1.jpg")',
        backgroundSize: "cover",
      }}
    >
      <main className="w-full max-w-md mx-auto p-6 pt-52">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">
                Sign in
              </h1>
              <p className="mt-2 text-sm text-gray-600 ">
                Don't have an account yet?
                <Link
                  className="text-blue-600 decoration-2 hover:underline font-medium ml-1"
                  href="/signup"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 ">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 border focus:ring-blue-500 "
                      required
                      aria-describedby="email-error"
                    />
                    <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                      <svg
                        className="h-5 w-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p
                    className="hidden text-sm text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-sm mb-2 ">
                      Password
                    </label>
                    <Link
                      className="text-blue-600 text-sm decoration-2 hover:underline font-medium ml-1"
                      href="/forgot-password"
                    >
                      Forgot Password
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      id="password"
                      name="password"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                      aria-describedby="password-error"
                    />
                    <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                      <svg
                        className="h-5 w-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                      dark:
                    </div>
                  </div>
                  <p
                    className="hidden text-sm text-red-600 mt-2"
                    id="password-error"
                  >
                    8+ characters required
                  </p>
                </div>

                <ReCAPTCHA
                  sitekey="6LcdwJchAAAAANYnunH4I-PcLt8etBR1_kLBHXHr"
                  onChange={handleRecaptchaChange}
                />
                <button
                  onClick={() => handleLogin()}
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
