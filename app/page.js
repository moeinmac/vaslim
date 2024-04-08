import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const welcome = async () => {
  
  const supabase = createClient();
  const data = await supabase.auth.getUser();
  if(data.data.user) redirect("/home");
  
  return (
    <>
      <div className="w-screen h-screen relative  overflow-hidden">
        <div className="hero"></div>
      </div>
      <div className="absolute bottom-10 z-10 w-full flex flex-col gap-y-6">
        <h1 className="text-white font-kalameh text-5xl text-center px-4">
          دوســـتان خــود را در
          <br /> وصـــــــلیم پیدا کــنید
        </h1>
        <p className="text-right  px-10 text-gray font-alibaba">
          با وصلیم شما به همه جا وصلین.
        </p>
        <Link className={"text-4xl font-kalameh rounded-xl px-8 py-4 mx-8 bg-blue text-center"} href="/auth">
          ورود / ثبت نام
        </Link>
      </div>
    </>
  );
};

export default welcome;
