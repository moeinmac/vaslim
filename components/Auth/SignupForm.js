"use client";

import { useState } from "react";
import Button from "../UI/Button";
import SignupData from "@/lib/SignupFormData";

const Input = ({ name, placeholder, focusHandler }) => {
  return (
    <input
      onFocus={focusHandler}
      on
      required
      className="w-full text-black font-alibaba text-xl outline-0 border-0 px-4 py-3 rounded-xl mt-2"
      type={placeholder === "رمز عبور" ? "password" : "text"}
      dir="auto"
      name={name}
      placeholder={placeholder}
    />
  );
};

const SignupForm = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const focusHandler = () => setInputFocus(true);
  let [signupLevel, setSignupLevel] = useState(0);
  const nextSignupLevel = async (event) => {
    setSignupLevel(signupLevel++);
  };

  return (
    <div className="flex flex-col p-8 justify-between h-[55%]">
      <div className="flex flex-col gap-y-6">
        <h1 className="font-alibaba text-3xl">
          {SignupData[signupLevel].header}
        </h1>
        {inputFocus && <p>{SignupData[signupLevel].help}</p>}
      </div>
      <div>
        <form action={nextSignupLevel}>
          {signupLevel === 0 && (
            <Input
              name="username"
              placeholder={SignupData[signupLevel].input}
              focusHandler={focusHandler}
            />
          )}
          {signupLevel === 1 && (
            <Input
              name="password"
              placeholder={SignupData[signupLevel].input}
              focusHandler={focusHandler}
            />
          )}
          {signupLevel === 2 && (
            <Input
              name="phone"
              placeholder={SignupData[signupLevel].input}
              focusHandler={focusHandler}
            />
          )}
          <Button className="bg-blue text-white w-full mt-4">
            {SignupData[signupLevel].button}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
