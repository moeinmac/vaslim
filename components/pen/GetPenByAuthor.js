import { createClient } from "@/lib/supabase/server";
import HomePenItem from "./HomePenItem";

const GetPenByAuthor = async ({ username, myUsername }) => {
  const supabase = createClient();
  const user = await supabase.from("user").select().eq("username", username);
  const { data } = await supabase.from("pen").select().eq("author", user.data[0].id);
  if (data.length > 2) data.length = 2;

  return (
    <>
      {data.map((pen) => (
        <HomePenItem
          key={pen.id}
          pen={pen}
          profile={user.data[0].profile}
          fullname={user.data[0].fullname}
          username={user.data[0].username}
          myUsername={myUsername}
        />
      ))}
    </>
  );
};

export default GetPenByAuthor;
