// import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

const message = () => {
  const supabase = createClient();
  const newChannel = supabase.channel("test-room");

  const messageReceived = (payload) => {
    console.log(payload);
    supabase.removeChannel(newChannel);
  };

  newChannel.on("broadcast", { event: "message" }, (payload) => messageReceived(payload)).subscribe();

  return (
    <>
      <div></div>

      {/* <header className="px-6 py-4 flex flex-col gap-2">
        <h1 className="font-kalameh text-5xl">ارسال پیام در دست توسعه میباشد .</h1>
        <p className="font-alibaba text-2xl">منتظر آپــدیت های بــعدی باشید.</p>
      </header>
      <Image  src={"/message.svg"} className="px-6" alt="پیام" fill/> */}
    </>
  );
};

export default message;
