import BellButton from "@/components/notification/BellButton";
import ExpolorePen from "@/components/pen/ExpolorePen";
import SwitchHomePen from "@/components/pen/SwitchHomePen";

import { createClient } from "@/lib/supabase/server";

const Explore = async () => {
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
        <BellButton myid={myAuth.data.user.id} />
      </header>
      <SwitchHomePen explore />
      <ExpolorePen vasl={data.vasl} id={myAuth.data.user.id} />
    </>
  );
};

export default Explore;
