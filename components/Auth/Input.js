import { forwardRef } from "react";

const Input = forwardRef(
  ({ name, placeholder, focusHandler, blurHandler, hidden }, ref) => {
    return (
      <input
        ref={ref}
        onFocus={focusHandler}
        onBlur={blurHandler}
        className={`${
          hidden ? "hidden" : ""
        } w-full text-black font-alibaba text-xl outline-0 border-0 px-4 py-3 rounded-xl mt-2`}
        type={placeholder === "رمز عبور" ? "password" : "text"}
        dir="auto"
        name={name}
        placeholder={placeholder}
      />
    );
  }
);

Input.displayName = "Input"

export default Input;
