import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

const message = () => {
  const supabase = createClient();
  const channelA = supabase.channel("room-1");

  function messageReceived(payload) {
    console.log(payload);
  }

  channelA.on("broadcast", { event: "test" }, (payload) => messageReceived(payload)).subscribe();

  return (
    <>
    <h1>TE</h1>
      {/* <header className="px-6 py-4 flex flex-col gap-2">
        <h1 className="font-kalameh text-5xl">ارسال پیام در دست توسعه میباشد .</h1>
        <p className="font-alibaba text-2xl">منتظر آپــدیت های بــعدی باشید.</p>
      </header>
      <Image  src={"/message.svg"} className="px-6" alt="پیام" fill/> */}
    </>
  );
};

export default message;
