import BackButton from "@/components/user/BackButton";
import EditAccount from "@/components/user/EditAccount";
import EditProfile from "@/components/user/EditProfile";
import { createClient } from "@/lib/supabase/server";

const edit = async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  const { data } = await supabase.from("user").select().eq("id", myAuth.data.user.id);
  return (
    <>
      <header className="px-6 py-4 flex flex-col gap-1">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-kalameh text-5xl">ویـرایش صفــــحه</h1>
          <BackButton className={"text-4xl"} />
        </div>
        <p className="font-alibaba">اطلاعات کـاربری تان را تغییر دهید</p>
      </header>
      <EditProfile profile={data[0].profile} id={myAuth.data.user.id} />
      <EditAccount
        fullname={data[0].fullname}
        username={data[0].username}
        phone={data[0].phone}
        email={myAuth.data.user.email}
      />
    </>
  );
};
export default edit;
