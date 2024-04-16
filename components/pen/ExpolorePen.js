import { createClient } from "@/lib/supabase/server";


import HomePenItem from "./HomePenItem";



export const ExpolorePen = async ({penData , myUsername}) => {

  return (
    <div className="flex flex-col gap-4 px-6">
      {penData.map((pen) => (
        <HomePenItem pen={pen} myUsername={myUsername} key={pen.id} />
      ))}
    </div>
  );
};

export default ExpolorePen;
