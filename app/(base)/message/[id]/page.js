import MessageCard from "@/components/message/MessageCard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const messagepage = async ({ params }) => {
  const supabase = createClient();
  const { data } = await supabase.from("message").select().eq("id", params.id).single();
  if (!data) redirect("/message");

  const myAuth = await supabase.auth.getUser();
  const isMyMessage = data.users.find((user) => user === myAuth.data.user.id);

  return data && isMyMessage ? (
    <MessageCard users={data.users} me={myAuth.data.user.id} />
  ) : (
    <div>
      <h1 className="font-kalameh text-4xl p-6">
        همچنین پیامی وجود ندارد و یا شما اجازه دسترسی به آن را ندارید
      </h1>
    </div>
  );
};

export default messagepage;
