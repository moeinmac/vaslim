import { createClient } from "@/lib/supabase/server";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import Profile from "@/components/user/Profile";
import Account from "@/components/user/Account";

const username = async ({ params }) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("user")
    .select()
    .eq("username", params.username);

  const myAuth = await supabase.auth.getUser();
  let me = await supabase.from("user").select().eq("id", myAuth.data.user.id);

  const isVasl = data[0].vasl.find(
    (username) => username === me.data[0].username
  );

  return data.length !== 0 ? (
    <>
      <div className="flex w-full justify-between items-center text-4xl p-6 pr-5 text-orange">
        <HiMiniEllipsisVertical />
        <IoReturnUpBackSharp />
      </div>
      <Profile
        profile={data[0].profile}
        fullname={data[0].fullname}
        username={data[0].username}
      />
      <Account
        vasl={data[0].vasl.length}
        isVasl={isVasl}
        me={me.data[0]}
        user={data[0]}
      />
    </>
  ) : (
    <h1>NO</h1>
  );
};

export default username;
