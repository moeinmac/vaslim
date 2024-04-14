import { createClient } from "@/lib/supabase/server";

import getAvailableSuggests from "@/lib/getAvailableSuggests";
import AccountList from "./AccountList";

const SuggestUser = async ({ text }) => {
  const supabase = createClient();

  const myAuth = await supabase.auth.getUser();
  const me = await supabase.from("user").select().eq("id", myAuth.data.user.id);
  const { data } = await supabase.from("user").select();
  const available = getAvailableSuggests(data, me.data[0].vasl, me.data[0].username);
  return (
    <>
      {available.length > 0 && <h1 className="font-kalameh text-3xl p-4">{text}</h1>}
      <AccountList accounts={available} suggest={true} />
    </>
  );
};

export default SuggestUser;
