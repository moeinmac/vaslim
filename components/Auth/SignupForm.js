"use client";

import { useRef, useState } from "react";
import SubmitButton from "./SubmitButton";
import SignupData from "@/lib/SignupFormData";
import Input from "./Input";
import { IoReturnDownBack } from "react-icons/io5";
import signupUser from "./SubmitSignupForm";

import { PiEyeClosedDuotone, PiEye } from "react-icons/pi";

const SignupForm = ({ message }) => {
  const [inputFocus, setInputFocus] = useState(false);
  const focusHandler = () => setInputFocus(true);
  const blurHandler = () => setInputFocus(false);

  const [passVisible, setPassVisible] = useState(false);
  const passwordVisibleHandler = () => setPassVisible(!passVisible);

  const [signupLevel, setSignupLevel] = useState({ level: 0 });

  const usernameRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  const nextSignupLevel = () => {
    if (signupLevel.level === 2) {
      const email = usernameRef.current.value;
      const password = passwordRef.current.value;
      const phone = phoneRef.current.value;
      signupUser(email, password, phone);
      return;
    }
    setSignupLevel({ level: signupLevel.level + 1 });
  };

  const signupLevelDown = (event) => {
    if (signupLevel.level === 0) return;
    event.preventDefault();
    setSignupLevel({ level: signupLevel.level - 1 });
  };

  return (
    <div className="flex flex-col p-8 justify-between h-[55%]">
      <div className="flex flex-col gap-y-6">
        <h1 className="font-alibaba text-3xl">{SignupData[signupLevel.level].header}</h1>
        {inputFocus && <p className="font-alibaba">{SignupData[signupLevel.level].help}</p>}
      </div>
      <form className="relative">
        <Input
          hidden={signupLevel.level != 0}
          ref={usernameRef}
          placeholder={SignupData[signupLevel.level].input}
          focusHandler={focusHandler}
          blurHandler={blurHandler}
          passVisible={!passVisible}
        />
        {signupLevel.level === 1 && (
          <div className="absolute left-0 -top-9 bg-white p-3 rounded-lg rounded-ee-none rounded-br-none">
            {!passVisible && (
              <PiEye className="text-3xl  z-10 text-black" onClick={passwordVisibleHandler} />
            )}
            {passVisible && (
              <PiEyeClosedDuotone
                className="text-3xl z-10 text-black top-5 right-4"
                onClick={passwordVisibleHandler}
              />
            )}
          </div>
        )}
        <Input
          hidden={signupLevel.level != 1}
          ref={passwordRef}
          placeholder={SignupData[signupLevel.level].input}
          focusHandler={focusHandler}
          blurHandler={blurHandler}
          passVisible={passVisible}
        />
        <Input
          hidden={signupLevel.level != 2}
          ref={phoneRef}
          placeholder={SignupData[signupLevel.level].input}
          focusHandler={focusHandler}
          blurHandler={blurHandler}
          passVisible={!passVisible}
        />
        <div className="flex align-center mt-4 gap-4">
          <SubmitButton
            formAction={nextSignupLevel}
            pendingText="بررسی اطلاعات..."
            className={`text-4xl font-kalameh rounded-xl px-8 py-4 bg-blue text-white ${
              signupLevel.level != 0 ? "w-[90%]" : "w-full"
            }`}
          >
            {SignupData[signupLevel.level].button}
          </SubmitButton>
          {signupLevel.level != 0 && (
            <button
              onClick={signupLevelDown}
              className="text-2xl border-4 rounded-xl border-blue p-4"
            >
              <IoReturnDownBack />
            </button>
          )}
        </div>
      </form>
      {message && (
        <p className="font-alibaba bg-gray text-red-500 px-3 py-2 rounded-xl">
          ثبت نام انجام نشد ! لطفا یکــبار دیگر اطلاعات وارد شده را بررسی کــرده و دوباره امتحان کــنید
        </p>
      )}
    </div>
  );
};

export default SignupForm;
