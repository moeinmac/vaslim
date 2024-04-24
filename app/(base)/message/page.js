import { convertUserItems, getUsersByPrimary } from "@/lib/getUsersByPrimary";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

const message = async () => {
  const supabase = createClient();

  const myAuth = await supabase.auth.getUser();
  const { data } = await supabase
    .from("user")
    .select("message")
    .eq("id", myAuth.data.user.id)
    .single();

  const myMessageItems = await convertUserItems(data.message, "with");


  return (
    <>
      {/* <header className="px-6 py-4 flex flex-col gap-2">
        <h1 className="font-kalameh text-5xl">ارسال پیام در دست توسعه میباشد .</h1>
        <p className="font-alibaba text-2xl">منتظر آپــدیت های بــعدی باشید.</p>
      </header>
      <Image src={"/message.svg"} className="px-6" alt="پیام" fill /> */}
      
    </>
  );
};

export default message;
