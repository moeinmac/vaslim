import LoginForm from "@/components/Auth/LoginForm";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const auth = async ({ searchParams }) => {
  const supabase = createClient();
  const data = await supabase.auth.getUser();
  if (data.data.user) redirect("/home");

  return (
    <>
      <div className="p-8 w-full flex flex-col h-screen justify-between">
        <div className="flex flex-col gap-y-5">
          <h1 className="font-alibaba text-3xl text-white">
            وارد حــساب{" "}
            <strong className="text-orange font-kalameh text-5xl">
              وصـــلیم
            </strong>{" "}
            خود شــوید
          </h1>
          <LoginForm message={searchParams.message} />
        </div>
        <div className="flex flex-col gap-y-4">
          <p className="text-lg text-gray font-alibaba">
            هنوز در وصلیم حساب نداری؟ منتظر چی هستی پس؟
          </p>
          <Link
            className="text-4xl font-kalameh text-black rounded-xl px-8 py-4 bg-orange text-center"
            href="/auth/signup">
            ثبت نام سریع
          </Link>
        </div>
      </div>
    </>
  );
};

export default auth;
