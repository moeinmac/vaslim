"use client";

import removeVasl from "@/lib/removeVasl";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const Account = ({ myUsername, userUsername }) => {
  const [me, setMe] = useState([]);
  const [user, setUser] = useState([]);
  const [isVasl, setIsVasl] = useState(false);

  const [confirm, setconfirm] = useState();

  const supabase = createClient();
  const getAllData = async () => {
    const userRes = await supabase.from("user").select().eq("username", userUsername);
    const meRes = await supabase.from("user").select().eq("username", myUsername);
    if (userRes && meRes) {
      setIsVasl(meRes.data[0].vasl.find((username) => username === userRes.data[0].username));
      setMe(meRes.data[0]);
      setUser(userRes.data[0]);
      return;
    }
    // Throw new Error {#fix_later}
  };

  const handleChanges = (paylod) => {
    if (paylod.new.username === myUsername) {
      setMe(paylod.new);
    }
    if (paylod.new.username === userUsername) {
      setUser(paylod.new);
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
    // nedd to add request to vasl first . {#fix_later}
    await supabase
      .from("user")
      .update({ vasl: [...user.vasl, myUsername] })
      .eq("username", userUsername);
    await supabase
      .from("user")
      .update({ vasl: [...me.vasl, userUsername] })
      .eq("username", myUsername);
    setIsVasl(true);
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
    setIsVasl(false);
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
        {!isVasl && (
          <button
            className="border-4 border-blue py-2 w-full text-4xl font-kalameh rounded-xl"
            onClick={vaslshimHandler}
          >
            وصــــــل شیم
          </button>
        )}
        {isVasl && !confirm && (
          <button
            className="bg-blue w-full py-2 text-4xl font-kalameh rounded-xl"
            onClick={confirmUnvasl}
          >
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
