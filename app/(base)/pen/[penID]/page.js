import PenCard from "@/components/pen/PenCard";
import { createClient } from "@/lib/supabase/server";

const UserPen = async ({ params }) => {
  const supabase = createClient();

  const myAuth = await supabase.auth.getUser();

  const myUsername = await supabase
    .from("user")
    .select("username")
    .eq("id", myAuth.data.user.id)
    .single();

  const { data } = await supabase
    .from("pen")
    .select("*, user(profile,username,fullname,isVerified,vasl)")
    .eq("id", params.penID)
    .single();

  return data.length !== 0 ? (
    <PenCard data={data} myid={myAuth.data.user.id} myUsername={myUsername.data.username} />
  ) : (
    <h1 className="font-kalameh text-4xl px-6 py-2">همچنین قــلمی وجود نداره</h1>
  );
};

export default UserPen;
