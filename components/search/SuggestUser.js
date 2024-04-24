import { createClient } from "@/lib/supabase/server";

import AccountList from "./AccountList";

const SuggestUser = async ({ text, myid }) => {
  const supabase = createClient();

  const mydata = await supabase.from("user").select("vasl,username").eq("id", myid).single();
  const notWantedUsers = [...mydata.data.vasl, mydata.data.username];
  const { data } = await supabase.rpc("get_suggest_users", {
    usernames: notWantedUsers,
  });

  return (
    <>
      {data.length > 0 && text && <h1 className="font-kalameh text-3xl p-4">{text}</h1>}
      <AccountList accounts={data} suggest={true} />
    </>
  );
};

export default SuggestUser;
