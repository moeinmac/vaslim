import { createClient } from "@/lib/supabase/server";
import Account from "@/components/user/Account";
import UserHeader from "@/components/user/UserHeader";
import { redirect } from "next/navigation";

const username = async ({ params }) => {
  const supabase = createClient();
  const { data } = await supabase.from("user").select().eq("username", params.username);

  const myAuth = await supabase.auth.getUser();
  let me = await supabase.from("user").select().eq("id", myAuth.data.user.id);
  if (data[0]) {
    if (data[0].username === me.data[0].username) redirect("/user");
  }

  return data.length !== 0 ? (
    <>
      <UserHeader
        profile={data[0].profile}
        fullname={data[0].fullname}
        username={data[0].username}
        path={"/search"}
      />

      <Account myUsername={me.data[0].username} userUsername={data[0].username} />
    </>
  ) : (
    <h1>NO</h1>
  );
};

export default username;
