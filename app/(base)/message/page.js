import UserMessageList from "@/components/message/UserMessagesList";
import SuggestUser from "@/components/search/SuggestUser";
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
  const soretedMessages = myMessageItems.sort((a, b) => b.unread - a.unread);

  return (
    <div className="flex flex-col">
      <header>
        <h1 className="font-kalameh px-6 py-4 text-5xl">لیست پــیام های شما</h1>
      </header>
      {soretedMessages.length === 0 && (
        <>
          <p className="font-alibaba px-6 py-4">
            هنوز با کسی گـــفتگو نداری ، میتونی از افراد زیر شروع کنی : 
          </p>
          <SuggestUser myid={myAuth.data.user.id} />
        </>
      )}

      <UserMessageList messageList={soretedMessages} />
    </div>
  );
};

export default message;
