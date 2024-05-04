import MyPen from "@/components/pen/MyPen";
import MyAccount from "@/components/user/MyAccount";
import UserHeader from "@/components/user/UserHeader";
import { createClient } from "@/lib/supabase/server";

const user = async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  let { data } = await supabase.from("user").select().eq("id", myAuth.data.user.id).single();
  return (
    <>
      <UserHeader
        profile={data.profile}
        fullname={data.fullname}
        username={data.username}
        isVerified={data.isVerified}
      />
      <MyAccount meData={data} />
      <h1 className="font-kalameh text-4xl px-6 py-2">نوشته های من</h1>
      <MyPen id={myAuth.data.user.id} myid={myAuth.data.user.id} />
    </>
  );
};

export default user;
