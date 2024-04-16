import HomePenItem from "./HomePenItem";
import { convertedPenItems, getUsersByPrimary } from "@/lib/getUsersByPrimary";
import { createClient } from "@/lib/supabase/server";


export const createExplorePen = async (vasl, myid) => {
  const supabase = createClient();
  const vaslUsers = await getUsersByPrimary(vasl, false, ["id"]);
  const notWantedIDs = vaslUsers.map((user) => user.id);
  notWantedIDs.push(myid);
  const { data } = await supabase.from("pen").select().not("author", "in", `(${notWantedIDs})`);
  return await convertedPenItems(data);
};

const ExpolorePen =async ({vasl, id , myUsername}) => {
  const explorePenData = await createExplorePen(vasl, id);
  return (
    <div className="flex flex-col gap-4 px-6">
      {explorePenData.map((pen) => (
        <HomePenItem pen={pen} myUsername={myUsername} key={pen.id} />
      ))}
    </div>
  );
};

export default ExpolorePen;
