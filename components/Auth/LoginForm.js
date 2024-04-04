import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SubmitButton from "./SubmitButton";

const LoginForm = () => {
  const signIn = async (formData) => {
    "use server";
    const supabase = createClient();

    const username = formData.get("username");
    const password = formData.get("password");
     
    const { error } = await supabase.auth.signInWithPassword({
      email : `${username}@gmail.com`,
      password,
    });

    if (error) {
      return redirect("/login?message=ورود با موفقیت انجام نشد");
    }

    return redirect("/home");
  };

  return (
    <form className="w-full flex flex-col gap-6 text-white">
      <label htmlFor="username" className="text-sm font-alibaba">
        نام کاربری
        <input
          id="username"
          required
          className="w-full bg-[#FFC970] text-black font-alibaba text-xl outline-0 border-0 px-4 py-3 rounded-xl mt-2"
          type="text"
          dir="ltr"
          name="username"
        />
      </label>
      <label htmlFor="password" className="text-sm font-alibaba">
        رمز عبور
        <input
          name="password"
          id="password"
          dir="ltr"
          className="w-full bg-[#FFC970] text-black font-alibaba text-xl outline-0 border-0 px-4 py-3 rounded-xl mt-2"
          type="password"
        />
      </label>

      <SubmitButton
        formAction={signIn}
        pendingText="در حال ورود..."
        className="bg-orange text-black text-4xl font-kalameh rounded-xl px-8 py-4 "
      >
        ورود
      </SubmitButton>
    </form>
  );
};

export default LoginForm;
