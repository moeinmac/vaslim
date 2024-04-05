"use client";

import { useRef, useState, forwardRef } from "react";
import Button from "../UI/Button";
import SignupData from "@/lib/SignupFormData";
import Input from "./Input";

const SignupForm = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const focusHandler = () => setInputFocus(true);
  const blurHandler = () => setInputFocus(false);

  const [signupLevel, setSignupLevel] = useState({ level: 0 });

  const usernameRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  const signupUser = async () => {
    console.log(usernameRef.current.value);
    console.log(passwordRef.current.value);
    console.log(phoneRef.current.value);
  };

  const nextSignupLevel = () => {
    if (signupLevel.level === 2) {
      signupUser();
      return;
    }
    setSignupLevel({ level: signupLevel.level + 1 });
  };

  return (
    <div className="flex flex-col p-8 justify-between h-[55%]">
      <div className="flex flex-col gap-y-6">
        <h1 className="font-alibaba text-3xl">
          {SignupData[signupLevel.level].header}
        </h1>
        {inputFocus && <p>{SignupData[signupLevel.level].help}</p>}
      </div>
      <form action={nextSignupLevel}>
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
        <Button className="bg-blue text-white w-full mt-4">
          {SignupData[signupLevel.level].button}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
