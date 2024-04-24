import SuggestUser from "@/components/search/SuggestUser";
import UserItem from "@/components/user/UserItem";
import { convertUserItems } from "@/lib/getUsersByPrimary";
import { createClient } from "@/lib/supabase/server";

const message = async () => {
  const supabase = createClient();

  const myAuth = await supabase.auth.getUser();
  const { data } = await supabase
    .from("user")
    .select("message")
    .eq("id", myAuth.data.user.id)
    .single();

  const myMessageItems = await convertUserItems(data.message, "with");

  return (
    <div className="flex flex-col">
      <header>
        <h1 className="font-kalameh px-6 py-4 text-5xl">لیست پــیام های شما</h1>
      </header>
      {myMessageItems.length === 0 && (
        <>
          <p className="font-alibaba px-6 py-4">هنوز به کـــسی پیامی ندادی ، میتونی به افراد زیر پیام بدی</p>
          <SuggestUser myid={myAuth.data.user.id}/>
        </>
      )}

      {myMessageItems.map((item) => (
        <UserItem data={item} path={`message/${item.id}`} key={item.id} />
      ))}
    </div>
  );
};

export default message;
