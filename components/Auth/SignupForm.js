"use client";

import { useRef, useState } from "react";
import SubmitButton from "./SubmitButton";
import SignupData from "@/lib/SignupFormData";
import Input from "./Input";
import { IoReturnDownBack } from "react-icons/io5";
import signupUser from "./SubmitSignupForm";

const SignupForm = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const focusHandler = () => setInputFocus(true);
  const blurHandler = () => setInputFocus(false);

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
        <h1 className="font-alibaba text-3xl">
          {SignupData[signupLevel.level].header}
        </h1>
        {inputFocus && (
          <p className="font-alibaba">{SignupData[signupLevel.level].help}</p>
        )}
      </div>
      <form>
        <Input
          hidden={signupLevel.level != 0}
          ref={usernameRef}
          placeholder={SignupData[signupLevel.level].input}
          focusHandler={focusHandler}
          blurHandler={blurHandler}
        />
        <Input
          hidden={signupLevel.level != 1}
          ref={passwordRef}
          placeholder={SignupData[signupLevel.level].input}
          focusHandler={focusHandler}
          blurHandler={blurHandler}
        />
        <Input
          hidden={signupLevel.level != 2}
          ref={phoneRef}
          placeholder={SignupData[signupLevel.level].input}
          focusHandler={focusHandler}
          blurHandler={blurHandler}
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
    </div>
  );
};

export default SignupForm;
