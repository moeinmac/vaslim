import MyAccount from "@/components/user/MyAccount";
import UserHeader from "@/components/user/UserHeader";
import { createClient } from "@/lib/supabase/server";

const user = async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  let { data } = await supabase.from("user").select().eq("id", myAuth.data.user.id);
  return (
    <>
      <UserHeader
        profile={data[0].profile}
        fullname={data[0].fullname}
        username={data[0].username}
      />
      <MyAccount meData={data[0]}/>
    </>
  );
};

export default user;
