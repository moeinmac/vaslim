import SuggestUser from "@/components/search/SuggestUser";
import UserItem from "@/components/user/UserItem";
import { convertUserItems, getUsersByPrimary } from "@/lib/getUsersByPrimary";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

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
          <p>هنوز به کـــسی پیامی ندادی ، میتونی به افراد زیر پیام بدی</p>
        </>
      )}
      {myMessageItems.map((item) => (
        <UserItem data={item} path={`message/${item.id}`} key={item.id} />
      ))}
    </div>
  );
};

export default message;
