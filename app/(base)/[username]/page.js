import { createClient } from "@/lib/supabase/server";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import Profile from "@/components/user/Profile";
import Account from "@/components/user/Account";
import Link from "next/link";

const username = async ({ params }) => {
  const supabase = createClient();
  const { data } = await supabase.from("user").select().eq("username", params.username);

  const myAuth = await supabase.auth.getUser();
  let me = await supabase.from("user").select().eq("id", myAuth.data.user.id);
  if(data[0]){
    if (data[0].username === me.data[0].username) redirect("/user"); 
  }



  return data.length !== 0 ? (
    <>
      <div className="flex w-full justify-between items-start text-4xl pt-8 pl-6 pr-5">
        <HiMiniEllipsisVertical className=" text-orange" />
        <Profile
          profile={data[0].profile}
          fullname={data[0].fullname}
          username={data[0].username}
        />
        <Link href="/home"><IoReturnUpBackSharp className=" text-orange"/></Link>
      </div>

      <Account myUsername={me.data[0].username} userUsername={data[0].username} />
    </>
  ) : (
    <h1>NO</h1>
  );
};

export default username;
