import MessageCard from "@/components/message/MessageCard";
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
    .eq("id", userid).single();
  // const data = await getUsersByPrimary(users, true, [
  //   "profile",
  //   "username",
  //   "isVerified",
  //   "fullname",
  //   "id",
  // ]);

  // const userdata = data.find((user) => user.id !== me);
  // const mydata = data.find((user) => user.id === me);

  return <MessageCard userdata={userdata.data} myid={myid} id={data.id} />;
};

export default messagepage;
