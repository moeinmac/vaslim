"use client";

import { loginHandler } from "@/lib/loginHandler";
import SubmitButton from "./SubmitButton";
import { PiEyeClosedDuotone, PiEye } from "react-icons/pi";
import { useState } from "react";

const LoginForm = ({ message }) => {
  const [passVisible, setPassVisible] = useState(false);
  const passwordVisibleHandler = () => setPassVisible(!passVisible);

  return (
    <form className="w-full flex flex-col gap-6 text-white">
      <label htmlFor="username" className="text-sm font-alibaba">
        نام کاربری (ایمیل)
        <input
          id="username"
          required
          className="w-full bg-[#FFC970] text-black font-alibaba text-xl outline-0 border-0 px-4 py-3 rounded-xl mt-2"
          type="text"
          dir="ltr"
          name="username"
        />
      </label>
      <label htmlFor="password" className="text-sm font-alibaba relative">
        رمز عبور
        <input
          required
          name="password"
          id="password"
          dir="ltr"
          className="w-full bg-[#FFC970] text-black font-alibaba text-xl outline-0 border-0 px-4 py-3 rounded-xl mt-2"
          type={passVisible ? "text" : "password"}
        />
        {!passVisible && (
          <PiEye
            className="text-3xl text-black right-2 absolute top-10"
            onClick={passwordVisibleHandler}
          />
        )}
        {passVisible && (
          <PiEyeClosedDuotone
            className="text-3xl text-black right-2 absolute top-10"
            onClick={passwordVisibleHandler}
          />
        )}
      </label>

      <SubmitButton
        formAction={loginHandler}
        pendingText="در حال ورود..."
        className="bg-orange text-black text-4xl font-kalameh rounded-xl px-8 py-4 "
      >
        ورود
      </SubmitButton>
      {message && (
        <p className="text-red-600 font-alibaba">
          ورود ناموفق بود ، اطلاعات ورود را چک کنید و دوبار امتحان کنید
        </p>
      )}
    </form>
  );
};

export default LoginForm;
