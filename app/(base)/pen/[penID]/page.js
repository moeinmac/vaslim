import { createClient } from "@/lib/supabase/server";

const UserPen = async ({ params }) => {
  const supabase = createClient();
  const { data } = await supabase.from("pen").select().eq("id", params.penID);
  const user = await supabase.from("user").select().eq("id",data[0].author);
  console.log(data[0].pen.split("\n"));
  return data.length !== 0 ? (
    <>
      <p className="whitespace-pre">{data[0].pen}</p>
    </>
  ) : (
    <h1 className="font-kalameh text-4xl px-6 py-2">همچنین کاربری وجود نداره</h1>
  );
};

export default UserPen;
