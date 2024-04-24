import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Profile from "@/components/user/Profile";
import BackButton from "@/components/user/BackButton";
import { getUsersByPrimary } from "@/lib/getUsersByPrimary";
import UserItem from "@/components/user/UserItem";

const Myvasl = async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  const { data } = await supabase
    .from("user")
    .select("profile,fullname,username,isVerified,vasl")
    .eq("id", myAuth.data.user.id)
    .single();

  if (!data) redirect("/home");

  const vasldata = await getUsersByPrimary(data.vasl, false, [
    "profile",
    "username",
    "isVerified",
    "fullname",
  ]);

  return (
    <>
      <header className="px-6 py-4 flex items-center justify-between">
        <Profile
          profile={data.profile}
          fullname={data.fullname}
          username={data.username}
          small={true}
        />
        <BackButton className={"text-4xl"} />
      </header>
      <h1 className="text-5xl px-6 py-2 font-kalameh">لیسـت متصـــــل ها</h1>
      <div className="flex flex-col gap-2 py-2">
        {data.vasl.length === 0 && (
          <p className="px-6 font-alibaba text-lg">
            شما به هیچکــس متصـــل نیستی! از قسمت جستجو میتوانید با افراد جدید آشنا شوید
          </p>
        )}
        {vasldata.map((data) => (
          <UserItem data={data} key={data.username} path={data.username} small />
        ))}
      </div>
    </>
  );
};

export default Myvasl;
