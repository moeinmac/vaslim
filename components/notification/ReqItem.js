import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

const ReqItem = async ({ userUsername, myUsername }) => {
  const supabase = createClient();
  const meRes = await supabase.from("user").select().eq("username", myUsername);
  const userRes = await supabase.from("user").select().eq("username", userUsername);
  const me = meRes.data[0];
  const user = userRes.data[0];

  const acseptReqHandler = async () => {
    await supabase
      .from("user")
      .update({ vasl: Array.from(new Set([...me.vasl, userUsername])) })
      .eq("username", myUsername);
    await supabase
      .from("user")
      .update({ vasl: Array.from(new Set([...user.vasl, myUsername])) })
      .eq("username", userUsername);

    await supabase
      .from("user")
      .update({ reqOut: removeVasl(user.reqOut, myUsername) })
      .eq("username", userUsername);
    await supabase
      .from("user")
      .update({ reqIn: removeVasl(me.reqIn, userUsername) })
      .eq("username", myUsername);
  };

  const denyReqHandler = async () => {
    await supabase
      .from("user")
      .update({ reqOut: removeVasl(user.reqOut, myUsername) })
      .eq("username", userUsername);
    await supabase
      .from("user")
      .update({ reqIn: removeVasl(me.reqIn, userUsername) })
      .eq("username", myUsername);
  };
  return (
    <Link href={`/${user.username}`}>
      <div className="bg-orange p-2 rounded-lg flex items-center gap-2">
        <Image src={user.profile} width={60} height={60} priority className="rounded-xl" />
        <div className="flex flex-col  text-black font-alibaba">
          <p className="">{user.fullname}</p>
          <p className="">{user.username}@</p>
        </div>
      </div>
    </Link>
  );
};

export default ReqItem;
