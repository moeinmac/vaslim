import { createClient } from "@/lib/supabase/server";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import Profile from "@/components/user/Profile";
import Account from "@/components/user/Account";
import { redirect } from "next/navigation";

const username = async ({ params }) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("user")
    .select()
    .eq("username", params.username);

  const myAuth = await supabase.auth.getUser();
  let me = await supabase.from("user").select().eq("id", myAuth.data.user.id);

  if (data[0].username === me.data[0].username) redirect("/user");

  const isVasl = data[0].vasl.find(
    (username) => username === me.data[0].username
  );

  return data.length !== 0 ? (
    <>
      <div className="flex w-full justify-between items-start text-4xl pt-8 pl-6 pr-5">
        <HiMiniEllipsisVertical className=" text-orange" />
        <Profile
          profile={data[0].profile}
          fullname={data[0].fullname}
          username={data[0].username}
        />
        <IoReturnUpBackSharp className=" text-orange" />
      </div>

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
