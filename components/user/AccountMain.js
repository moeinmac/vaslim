"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import UserMessageButton from "../message/UserMessageButton";
import VaslButton from "./VaslButton";

import { TbUserCancel } from "react-icons/tb";
import AccountButton from "./AccountButton";
import { sendHandler } from "@/lib/req/sendHandler";
import { reclaimHandler } from "@/lib/req/reclaimHandler";
import { denyHandler } from "@/lib/req/denyHandler";
import { acceptHandler } from "@/lib/req/acceptHandler";
import Modal from "../Modal/Modal";
import { unVaslHandler } from "@/lib/req/unVaslHandler";

const statusCheack = (userdata, mydata) => {
  const checkReqOut = userdata.reqOut.find((username) => username === mydata.username);
  if (checkReqOut) {
    return {
      reqIn: true,
      reqOut: false,
      vasl: false,
      text: "قبولش کـن",
    };
  }
  const checkReqIn = userdata.reqIn.find((username) => username === mydata.username);
  if (checkReqIn) {
    return {
      reqIn: false,
      reqOut: true,
      vasl: false,
      text: "درخواست داده شده",
    };
  }
  const check1 = mydata.vasl.find((username) => username === userdata.username);
  const check2 = userdata.vasl.find((username) => username === mydata.username);
  if (check1 && check2) {
    return {
      reqIn: false,
      reqOut: false,
      vasl: true,
      text: "متصـــــــل هستید",
    };
  }
  return {
    reqIn: false,
    reqOut: false,
    vasl: false,
    text: "وصــــــل شیم",
  };
};

const AccountMain = ({ userdata, mydata }) => {
  const [me, setMe] = useState(mydata);
  const [user, setUser] = useState(userdata);
  const [status, setStatus] = useState(statusCheack(userdata, mydata));

  const [confirmUnvasl, setConfirmUnVasl] = useState();
  const confirmUnVaslHandler = () => setConfirmUnVasl(!confirmUnvasl);

  const supabase = createClient();

  const reclaimReqHandler = async () => {
    reclaimHandler(user, me);
  };
  const denyReqHandler = async () => {
    denyHandler(user, me);
  };

  const acceptReqHandler = async () => {
    acceptHandler(user, me);
  };

  const unVaslUserHandler = async () => {
    unVaslHandler(user, me);
    setConfirmUnVasl(false);
  };

  const getAllData = async (user) => {
    const { data } = await supabase.from("user").select().eq("id", mydata.id).single();
    if (data) {
      setStatus(statusCheack(user, data));
      setMe(data);
      setUser(user);
    }
  };

  const handleChanges = (paylod) => {
    if (paylod.new.id === userdata.id) getAllData(paylod.new);
  };

  supabase
    .channel("updateUser")
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "user" }, handleChanges)
    .subscribe();
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <form className="flex items-center gap-8  w-full">
        <input type="hidden" name="userUsername" defaultValue={user.username} />
        <input type="hidden" name="myUsername" defaultValue={me.username} />
        <VaslButton vasl={user.vasl ? user.vasl.length : 0} username={user.username} />
        {!status.vasl && !status.reqIn && !status.reqOut && (
          <AccountButton
            actionForm={sendHandler}
            className={"border-4 border-blue py-2 w-full text-4xl font-kalameh rounded-xl"}
            buttonText={status.text}
          />
        )}
        {status.reqOut && (
          <AccountButton
            actionForm={reclaimReqHandler}
            className={"bg-gray text-black py-2 w-full text-4xl font-kalameh rounded-xl"}
            buttonText={status.text}
          />
        )}
        {status.reqIn && (
          <div className="flex w-full gap-3">
            <AccountButton
              className={"bg-gray text-black py-2 w-full text-4xl font-kalameh rounded-xl"}
              buttonText={status.text}
              actionForm={acceptReqHandler}
            />
            <AccountButton
              className=" bg-red-600 py-2 px-1 text-5xl font-kalameh rounded-xl"
              actionForm={denyReqHandler}
            >
              <TbUserCancel className="text-2xl text-white" />
            </AccountButton>
          </div>
        )}
        {status.vasl && (
          <button
            className={"bg-blue w-full py-2 text-4xl font-kalameh rounded-xl"}
            onClick={(event) => {
              event.preventDefault();
              confirmUnVaslHandler();
            }}
          >
            {status.text}
          </button>
        )}
      </form>
      <UserMessageButton
        userMessage={user.message}
        myMessage={me.message}
        userid={user.id}
        myid={me.id}
      />
      {confirmUnvasl && (
        <Modal
          onClose={confirmUnVaslHandler}
          className={
            "flex flex-col items-center w-[90%] left-[5%] top-[25vh] gap-4 bg-blue font-kalameh rounded-lg"
          }
        >
          <h3 className="text-4xl">آیا میخواهید دیگر به این کاربر وصل نباشید؟</h3>
          <form className="w-full">
            <AccountButton
              buttonText={"اره قطع ش کن"}
              className="bg-red-600  w-full rounded-lg py-2 text-3xl"
              actionForm={unVaslUserHandler}
            />
          </form>
          <button
            onClick={confirmUnVaslHandler}
            className="bg-[#5D85DD] w-full rounded-lg py-2 text-3xl"
          >
            نه ولـــش کن
          </button>
        </Modal>
      )}
    </div>
  );
};

export default AccountMain;
