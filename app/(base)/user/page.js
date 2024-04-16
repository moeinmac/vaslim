import MyPen from "@/components/pen/MyPen";
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
        isVerified={data[0].isVerified}
        isLogout
      />
      <MyAccount meData={data[0]} />
      <h1 className="font-kalameh text-4xl px-6 py-2">نوشته های من</h1>
      <MyPen id={myAuth.data.user.id} myUsername={data[0].username} />
    </>
  );
};

export default user;
