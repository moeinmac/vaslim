import { createClient } from "@/lib/supabase/server";
import UserPenItem from "./UserPenItem";

const UserPen = async ({ username, myUsername }) => {
  const supabase = createClient();
  const userID = await supabase.from("user").select("id").eq("username", username).single();
  const { data } = await supabase
    .from("pen")
    .select()
    .eq("author", userID.data.id)
    .order("created_at", { ascending: false });

  return (
    <div className="flex justify-center flex-col gap-4 px-6 pt-4">
      {data.length !== 0 &&
        data.map((pen) => <UserPenItem myUsername={myUsername} pen={pen} key={pen.id} />)}
      {data.length === 0 && (
        <div className="flex flex-col">
          <p className="font-alibaba">
            این کــاربر هنوز هیچ نوشته ای نداره ، قول میده که به زودی دست به قلم بشه
          </p>
        </div>
      )}
    </div>
  );
};

export default UserPen;
