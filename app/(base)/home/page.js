import GetDot from "@/components/dot/GetDot";
import BellButton from "@/components/notification/BellButton";
import ExpolorePen from "@/components/pen/ExpolorePen";
import HomePen from "@/components/pen/HomePen";
import SwitchHomePen from "@/components/pen/SwitchHomePen";
import { FAKEDOTDATA } from "@/lib/FAKEDOTDATA";
import { createClient } from "@/lib/supabase/server";

import { convertedPenItems, getUsersByPrimary } from "@/lib/getUsersByPrimary";

export const createExplorePen = async (vasl, myid) => {
  const supabase = createClient();
  const vaslUsers = await getUsersByPrimary(vasl, false, ["id"]);
  const notWantedIDs = vaslUsers.map((user) => user.id);
  notWantedIDs.push(myid);
  const { data } = await supabase.from("pen").select().not("author", "in", `(${notWantedIDs})`);
  return await convertedPenItems(data);
};

const Home = async ({ searchParams }) => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  const { data } = await supabase.from("user").select().eq("id", myAuth.data.user.id);
  const explorePenData = await createExplorePen(data[0].vasl, data[0].id);
  return (
    <>
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="font-kalameh text-5xl ">وصـــلیم</h1>
        <BellButton myUsername={data[0].username} />
      </header>
      <GetDot
        dotData={FAKEDOTDATA}
        myProfile={data[0].profile}
        isBlur={data[0].vasl.length > 1 ? true : false}
      />
      <SwitchHomePen params={searchParams} username={data[0].username} />
      {!searchParams.fayre && <HomePen vasl={data[0].vasl} myUsername={data[0].username} />}
      {searchParams.fayre && <ExpolorePen myUsername={data[0].username} penData={explorePenData} />}
    </>
  );
};

export default Home;
