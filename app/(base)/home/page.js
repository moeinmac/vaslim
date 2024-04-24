import GetDot from "@/components/dot/GetDot";
import BellButton from "@/components/notification/BellButton";
import ExpolorePen from "@/components/pen/ExpolorePen";
import HomePen from "@/components/pen/HomePen";
import SwitchHomePen from "@/components/pen/SwitchHomePen";
import { FAKEDOTDATA } from "@/lib/FAKEDOTDATA";
import { createClient } from "@/lib/supabase/server";

const Home = async ({ searchParams }) => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  const { data } = await supabase
    .from("user")
    .select("username,profile,vasl")
    .eq("id", myAuth.data.user.id)
    .single();

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="font-kalameh text-5xl ">وصـــلیم</h1>
        <BellButton myUsername={data.username} />
      </header>
      <GetDot
        dotData={FAKEDOTDATA}
        myProfile={data.profile}
        isBlur={data.vasl.length > 1 ? true : false}
      />
      <SwitchHomePen params={searchParams} username={data.username} />
      {!searchParams.explore && (
        <HomePen vasl={data.vasl} myUsername={data.username} myid={myAuth.data.user.id} />
      )}
      {searchParams.explore && (
        <ExpolorePen myUsername={data.username} vasl={data.vasl} id={myAuth.data.user.id} />
      )}
    </>
  );
};

export default Home;
