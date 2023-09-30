"use client";

import UserService from "@/app/api/services/UserService";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    const { email, password, confirm } = data;

    if (password === confirm) {
      var provider = "credentials";
      const user = await UserService.create({ email, password, provider });
      if (user.status==201) {
        return await signIn("credentials", {
          email: email,
          password: password,
          redirect: true,
          callbackUrl: "/register",
        });
      }
    }
    console.log("something goes wrong");
  };

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">
              Welcome, keep your hair in your head. Time to get control of
              schedules and management.
            </h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    E-mail <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="email"
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your email"
                    {...register("email")}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="password"
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your password"
                    required
                    {...register("password")}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Confirm Password <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your password again"
                    {...register("confirm")}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                    Sign up
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500 text-center mt-3">
                By creating an account, you agree to the{" "}
                <a className="underline" href="#0">
                  terms & conditions
                </a>
                , and our{" "}
                <a className="underline" href="#0">
                  privacy policy
                </a>
                .
              </div>
            </form>
            <div className="flex items-center my-6">
              <div
                className="border-t border-gray-300 grow mr-3"
                aria-hidden="true"
              ></div>
              <div className="text-gray-600 italic">Or</div>
              <div
                className="border-t border-gray-300 grow ml-3"
                aria-hidden="true"
              ></div>
            </div>
            {/* <div className="flex flex-wrap -mx-3">
              <div className="w-full px-3">
                <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                  <svg
                    className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                  </svg>
                  <span className="flex-auto pl-16 pr-8 -ml-16">
                    Continue with Google
                  </span>
                </button>
              </div>
            </div> */}
            <div className="text-gray-600 text-center mt-6">
              Already using Simple?{" "}
              <Link
                href="/signin"
                className="text-blue-600 hover:underline transition duration-150 ease-in-out"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
