import { createClient } from "@/lib/supabase/server";
import UserHeader from "@/components/user/UserHeader";
import { redirect } from "next/navigation";
import UserPen from "@/components/pen/UserPen";
import { fetchUserPen } from "@/lib/pen/fetchUserPen";
import AccountMain from "@/components/user/AccountMain";
import VaslimAccount from "@/components/user/VaslimAccount";

const username = async ({ params }) => {
  const supabase = createClient();
  const { data } = await supabase.from("user").select().eq("username", params.username).single();

  const myAuth = await supabase.auth.getUser();
  const me = await supabase.from("user").select().eq("id", myAuth.data.user.id).single();
  if (data) {
    if (data.username === me.data.username) redirect("/user");
  }

  const initPens = await fetchUserPen(data.id, 1);

  return data.length !== 0 ? (
    <>
      <UserHeader
        profile={data.profile}
        fullname={data.fullname}
        username={data.username}
        isVerified={data.isVerified}
      />

      {data.id !== "5af81674-ba0f-4ffa-9d73-efadcdde153b" ? (
        <AccountMain userdata={data} mydata={me.data} />
      ) : (
        <VaslimAccount
          usermessage={data.message}
          mymessage={me.data.message}
          myid={myAuth.data.user.id}
          userid={data.id}
        />
      )}
      {initPens.length === 0 && (
        <div className="flex flex-col px-6">
          <p className="font-alibaba">
            این کــاربر هنوز هیچ نوشته ای نداره ، قول میده که به زودی دست به قلم بشه
          </p>
        </div>
      )}
      {initPens.length >= 1 && (
        <UserPen userid={data.id} myid={myAuth.data.user.id} initPens={initPens} />
      )}
    </>
  ) : (
    <h1 className="font-kalameh text-4xl px-6 py-2">همچنین کاربری وجود نداره</h1>
  );
};

export default username;
