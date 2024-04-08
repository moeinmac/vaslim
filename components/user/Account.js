"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

import Button from "../UI/Button";

const Account = ({ vasl, isVasl, me, user }) => {
  const supabase = createClient();
  const [vaslData, setVaslData] = useState({ vasl, isVasl });

  const [confirm, setconfirm] = useState();

  const vaslshimHandler = async () => {
    // nedd to add request to vasl first . {#fix_later}
    await supabase
      .from("user")
      .update({ vasl: [...user.vasl, me.username] })
      .eq("username", user.username);
    await supabase
      .from("user")
      .update({ vasl: [...me.vasl, user.username] })
      .eq("username", me.username);
    setVaslData({ vasl: vasl + 1, isVasl: !isVasl });
  };

  const confirmUnvasl = () => setconfirm(!confirm);

  const unVaslHandler = async () => {};

  return (
    <div className="flex flex-col gap-4 px-8 py-4">
        {confirm && <p>مطمئنی که میخوای این کاربر رو از لیست متصل هات حذف کنی؟</p>}
      <div className="flex items-center gap-8  w-full">
        <p className="font-kalameh text-3xl flex flex-col">
          <span className="text-center">{vaslData.vasl}</span>
          <span className="font-alibaba text-base">متصل</span>
        </p>
        {!vaslData.isVasl && (
          <Button
            className="border-4 w-full text-4xl border-blue"
            onClick={vaslshimHandler}
          >
            وصــــــل شیم
          </Button>
        )}
        {vaslData.isVasl && !confirm && (
          <Button className="bg-blue w-full text-4xl" onClick={confirmUnvasl}>
            متصـــل
          </Button>
        )}
        {vaslData.isVasl && confirm && (
          <div className="flex w-full justify-between text-xl font-kalameh">
            <button className="bg-red-700 p-2 rounded-lg" onClick={unVaslHandler}>
              اره
            </button>
            <button className="bg-blue p-2 rounded-lg" onClick={confirmUnvasl}>
              نه ولش کن
            </button>
          </div>
        )}
      </div>
      <Button className="w-full border-4 border-white">پیام دهید</Button>
    </div>
  );
};

export default Account;
