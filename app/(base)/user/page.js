import MyPen from "@/components/pen/MyPen";
import MyAccount from "@/components/user/MyAccount";
import UserHeader from "@/components/user/UserHeader";
import { fetchUserPen } from "@/lib/pen/fetchUserPen";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const user = async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  let { data } = await supabase.from("user").select().eq("id", myAuth.data.user.id).single();

  const initPens = await fetchUserPen(myAuth.data.user.id, 1);
  return (
    <>
      <UserHeader
        profile={data.profile}
        fullname={data.fullname}
        username={data.username}
        isVerified={data.isVerified}
        me
      />
      <MyAccount meData={data} />
      <h1 className="font-kalameh text-4xl px-6 py-2">قـــلم های من</h1>

      {initPens.length === 0 && (
        <div className="flex flex-col gap-4 px-6">
          <p className="font-alibaba">شما هنوز دست به قلم نشدی! همین الان یه چیزی بنویس</p>
          <Link
            href="/pen/new"
            className="w-full text-center bg-blue text-4xl font-kalameh rounded-xl px-8 py-4"
          >
            بریم قلم بزنیم
          </Link>
        </div>
      )}
      {initPens.length >= 1 && (
        <MyPen id={myAuth.data.user.id} myid={myAuth.data.user.id} initPens={initPens} />
      )}
    </>
  );
};

export default user;
