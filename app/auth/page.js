import LoginForm from "@/components/Auth/LoginForm";
import Button from "@/components/UI/Button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const auth = async ({searchParams}) => {

  const supabase = createClient();
  const data = await supabase.auth.getUser();
  if(data.data.user) redirect("/home");

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
          <LoginForm message={searchParams.message}/>
        </div>
        <div className="flex flex-col gap-y-4">
          <p className="text-lg text-gray font-alibaba">
            هنوز در وصلیم حساب نداری؟ منتظر چی هستی پس؟
          </p>
          <Button className={"bg-orange text-black"} path={"auth/signup"}>
            ثبت نام سریع
          </Button>
        </div>
      </div>
    </>
  );
};

export default auth;
