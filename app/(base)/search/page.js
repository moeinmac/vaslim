import SearchInput from "@/components/search/SearchInput";
import SuggestUser from "@/components/search/SuggestUser";
import { createClient } from "@/lib/supabase/server";

const search = async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  return (
    <>
      <SearchInput />
      <SuggestUser
        myid={myAuth.data.user.id}
        text={"شما میتوانید افراد زیر را به حـــساب خودتان وصل کنید:"}
      />
    </>
  );
};

export default search;
