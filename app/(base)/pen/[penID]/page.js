import PenItem from "@/components/pen/PenItem";
import { createClient } from "@/lib/supabase/server";

const UserPen = async ({ params }) => {
  const supabase = createClient();

  const myAuth = await supabase.auth.getUser();
  const myUser = await supabase.from("user").select().eq("id", myAuth.data.user.id);

  const { data } = await supabase.from("pen").select().eq("id", params.penID);
  const user = await supabase.from("user").select().eq("id", data[0].author);

  return data.length !== 0 ? (
    <div className="p-2">
      <PenItem user={user.data[0]} pen={data[0]} myUsername={myUser.data[0].username} />
    </div>
  ) : (
    <h1 className="font-kalameh text-4xl px-6 py-2">همچنین قــلمی وجود نداره</h1>
  );
};

export default UserPen;
