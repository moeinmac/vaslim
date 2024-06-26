import { forwardRef } from "react";

const Input = forwardRef(
  ({ name, placeholder, focusHandler, blurHandler, hidden, readOnly, passVisible }, ref) => {
    const checkType = placeholder !== "رمز عبور" ? "text" : !passVisible ? "password" : "text";
    return (
      <input
        ref={ref}
        onFocus={focusHandler}
        onBlur={blurHandler}
        className={`${placeholder === "رمز عبور" ? "rounded-tl-none" : ""} ${
          hidden ? "hidden" : ""
        }  w-full text-black font-alibaba text-xl outline-0 border-0 px-4 py-3 rounded-xl mt-2`}
        type={checkType}
        dir="auto"
        name={name}
        placeholder={placeholder}
        readOnly={readOnly ? readOnly : false}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
