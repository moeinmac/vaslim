import BackButton from "@/components/user/BackButton";
import EditAccount from "@/components/user/EditAccount";
import EditProfile from "@/components/user/EditProfile";
import { createClient } from "@/lib/supabase/server";

const edit = async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  const { data } = await supabase
    .from("user")
    .select("profile,username,phone,fullname")
    .eq("id", myAuth.data.user.id)
    .single();
  return (
    <>
      <header className="px-6 py-4 flex flex-col gap-1">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-kalameh text-5xl">ویـرایش صفــــحه</h1>
          <BackButton className={"text-4xl"} />
        </div>
        <p className="font-alibaba">اطلاعات کـاربری تان را تغییر دهید</p>
      </header>
      <EditProfile profile={data.profile} id={myAuth.data.user.id} />
      <EditAccount
        fullname={data.fullname}
        username={data.username}
        phone={data.phone}
        email={myAuth.data.user.email}
        id={myAuth.data.user.id}
      />
    </>
  );
};
export default edit;
