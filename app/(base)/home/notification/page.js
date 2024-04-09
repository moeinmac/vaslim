import { createClient } from "@/lib/supabase/server";
import { ImBell } from "react-icons/im";
import ReqItem from "@/components/notification/ReqItem";

const notification = async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  const { data } = await supabase.from("user").select().eq("id", myAuth.data.user.id);
  console.log(data);
  return (
    <>
      <header className="flex justify-between items-center px-8 py-4">
        <h1 className="font-kalameh text-4xl ">اعــلان های شما</h1>
        <ImBell className="text-3xl" />
      </header>
      <div className="flex flex-col p-4 gap-4">
        {data[0].reqIn.map((username) => (
          <ReqItem myUsername={data[0].username} userUsername={username} key={username} />
        ))}
      </div>
    </>
  );
};

export default notification;
