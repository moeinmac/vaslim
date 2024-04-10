"use client";

import removeVasl from "@/lib/removeVasl";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { TbUserCancel } from "react-icons/tb";
import { acceptHandler } from "@/lib/req/acceptHandler";
import { denyHandler } from "@/lib/req/denyHandler";

const Account = ({ myUsername, userUsername }) => {
  const [me, setMe] = useState([]);
  const [user, setUser] = useState([]);
  const [isVasl, setIsVasl] = useState(false);
  const [isReqOut, setReqOut] = useState(false);
  const [isReqIn, setReqIn] = useState(false);

  const [confirm, setconfirm] = useState();

  const supabase = createClient();
  const getAllData = async () => {
    const userRes = await supabase.from("user").select().eq("username", userUsername);
    const meRes = await supabase.from("user").select().eq("username", myUsername);
    if (userRes && meRes) {
      setMe(meRes.data[0]);
      setUser(userRes.data[0]);
      const checkReqOut = meRes.data[0].reqOut.find((username) => username === userUsername);
      if (checkReqOut) {
        setReqOut(checkReqOut);
        return;
      }
      const checkReqIn = meRes.data[0].reqIn.find((username) => username === userUsername);
      if (checkReqIn) {
        setReqIn(checkReqIn);
        return;
      }
      setReqIn(false);
      setReqOut(false);
      const check1 = meRes.data[0].vasl.find((username) => username === userUsername);
      const check2 = userRes.data[0].vasl.find((username) => username === myUsername);
      setIsVasl(check1 && check2);
      return;
    }
    // Throw new Error {#fix_later}
  };

  const handleChanges = (paylod) => {
    if (paylod.new.username === myUsername || paylod.new.username === userUsername) {
      getAllData();
    }
  };

  supabase
    .channel("updateVaslUser")
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "user" }, handleChanges)
    .subscribe();

  useEffect(() => {
    getAllData();
  }, []);

  const vaslshimHandler = async () => {
    await supabase
      .from("user")
      .update({ reqOut: Array.from(new Set([...me.reqOut, userUsername])) })
      .eq("username", myUsername);
    await supabase
      .from("user")
      .update({ reqIn: Array.from(new Set([...user.reqIn, myUsername])) })
      .eq("username", userUsername);
  };

  const confirmUnvasl = () => setconfirm(!confirm);
  const unVaslHandler = async () => {
    await supabase
      .from("user")
      .update({ vasl: removeVasl(user.vasl, myUsername) })
      .eq("username", userUsername);
    await supabase
      .from("user")
      .update({ vasl: removeVasl(me.vasl, userUsername) })
      .eq("username", myUsername);
    setconfirm(false);
  };

  const unReqHandler = async () => {
    await supabase
      .from("user")
      .update({ reqIn: removeVasl(user.reqIn, myUsername) })
      .eq("username", userUsername);
    await supabase
      .from("user")
      .update({ reqOut: removeVasl(me.reqOut, userUsername) })
      .eq("username", myUsername);
  };

  const acceptReqHandler = async () => {
    acceptHandler(user, me);
  };

  const denyReqHandler = async () => {
    denyHandler(user, me);
  };

  return (
    <div className="flex flex-col gap-4 px-8 py-4">
      {confirm && (
        <p className="font-alibaba">مطمئنی که میخوای این کاربر رو از لیست متصل هات حذف کنی؟</p>
      )}
      <div className="flex items-center gap-8  w-full">
        <p className="font-kalameh text-3xl flex flex-col">
          <span className="text-center">{user.vasl ? user.vasl.length : 0}</span>
          <span className="font-alibaba text-base">متصل</span>
        </p>
        {!isVasl && !isReqOut && !isReqIn && (
          <button
            className="border-4 border-blue py-2 w-full text-4xl font-kalameh rounded-xl"
            onClick={vaslshimHandler}>
            وصــــــل شیم
          </button>
        )}
        {!isVasl && isReqOut && (
          <button
            className="bg-gray text-black py-2 w-full text-4xl font-kalameh rounded-xl"
            onClick={unReqHandler}>
            درخواست داده شده
          </button>
        )}
        {!isVasl && isReqIn && (
          <div className="flex w-full gap-3">
            <button
              className="bg-gray text-black py-2 w-full text-4xl font-kalameh rounded-xl"
              onClick={acceptReqHandler}>
              قبولش کن
            </button>
            <button
              className="bg-red-600 text-black py-2 px-1 text-4xl font-kalameh rounded-xl"
              onClick={denyReqHandler}>
              <TbUserCancel className="text-white text-red-600" />
            </button>
          </div>
        )}
        {isVasl && !confirm && (
          <button
            className="bg-blue w-full py-2 text-4xl font-kalameh rounded-xl"
            onClick={confirmUnvasl}>
            متصـــــــل هستید
          </button>
        )}
        {isVasl && confirm && (
          <div className="flex w-full justify-between text-2xl font-kalameh">
            <button className="border-4 border-red-700 p-2 rounded-lg" onClick={unVaslHandler}>
              اره حذفش کن
            </button>
            <button className="bg-blue p-2 rounded-lg" onClick={confirmUnvasl}>
              نه ولش کن
            </button>
          </div>
        )}
      </div>
      <button className="font-kalameh text-3xl py-2 rounded-xl w-full border-4 border-white">
        پیام دهید
      </button>
    </div>
  );
};

export default Account;
