import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

const VaslItem = async ({ username }) => {
  const supabase = createClient();
  const { data } = await supabase.from("user").select().eq("username", username);
  return (
    <Link
      className="py-2 px-6 flex items-center gap-2 transition-transform duration-100 active:scale-90 active:bg-[#06171d] focus:bg-[#06171d]"
      href={`/${username}`}>
      <Image
        src={data[0].profile}
        alt={data[0].fullname}
        width={40}
        height={40}
        className="rounded-lg"
      />
      <div className="flex w-full text-black font-alibaba items-center justify-between">
        <div>
          <p className="text-white text-sm">{data[0].fullname}</p>
          <p className="text-[0.7rem] text-white">{data[0].username}@</p>
        </div>
      </div>
    </Link>
  );
};

export default VaslItem;
