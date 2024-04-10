import { createClient } from "@/lib/supabase/server";
import BackButton from "@/components/user/BackButton";
import ReqList from "@/components/notification/ReqList";

const notification = async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  const { data } = await supabase.from("user").select().eq("id", myAuth.data.user.id);
  await supabase
    .from("user")
    .update({
      notification: { isChecked: true, data: data[0].notification["data"] },
    })
    .eq("username", myAuth.data.user.id);
  return (
    <>
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="font-kalameh text-5xl ">اعــلان های شما</h1>
        <BackButton path={"/home"} className={"text-4xl"} />
      </header>
      <ReqList myUsername={data[0].username} reqIn={data[0].reqIn} />
    </>
  );
};

export default notification;
