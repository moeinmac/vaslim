import MessageCard from "@/components/message/MessageCard";;
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const messagepage = async ({ params }) => {
  const supabase = createClient();
  const { data } = await supabase.from("message").select().eq("id", params.id).single();
  if (!data) redirect("/message");

  const myAuth = await supabase.auth.getUser();
  const isMyMessage = data.users.find((user) => user === myAuth.data.user.id);

  if (!isMyMessage) redirect("/message");

  const myid = myAuth.data.user.id;

  const userid = data.users.find((user) => user !== myid);

  const userdata = await supabase
    .from("user")
    .select("profile,username,isVerified,fullname")
    .eq("id", userid)
    .single();

  return (
    <MessageCard
      userdata={userdata.data}
      userid={userid}
      myid={myid}
      id={data.id}
      created_at={data.created_at}
    />
  );
};

export default messagepage;
