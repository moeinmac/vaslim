import { createClient } from "@/lib/supabase/server";
import UserPenItem from "./UserPenItem";
import Link from "next/link";

const MyPen = async ({ id, myid }) => {
  const supabase = createClient();
  const { data } = await supabase.from("pen").select().eq("author", id).order("created_at",{ascending : false});
  return (
    <div className="flex justify-center flex-col gap-4 px-6 pt-4">
      {data.length !== 0 &&
        data.map((pen) => <UserPenItem myid={myid} pen={pen} key={pen.id} />)}
      {data.length === 0 && (
        <div className="flex flex-col gap-4">
          <p className="font-alibaba">شما هنوز دست به قلم نشدی! همین الان یه چیزی بنویس</p>
          <Link
            href="/pen/new"
            className="w-full text-center bg-blue text-4xl font-kalameh rounded-xl px-8 py-4"
          >
            بریم قلم بزنیم
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyPen;
