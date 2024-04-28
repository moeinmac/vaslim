import { createClient } from "@/lib/supabase/server";
import BackButton from "@/components/user/BackButton";
import ReqList from "@/components/notification/ReqList";
import NotifcationList from "@/components/notification/NotificationList";

const notification = async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  const { data } = await supabase
    .from("user")
    .select("username,reqIn,notification")
    .eq("id", myAuth.data.user.id)
    .single();
  return (
    <>
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="font-kalameh text-5xl ">اعــلان های شما</h1>
        <BackButton path={"/home"} className={"text-4xl"} />
      </header>
      <NotifcationList notification={data.notification} myid={myAuth.data.user.id} />
      <ReqList myUsername={data.username} reqIn={data.reqIn} />
    </>
  );
};

export default notification;
