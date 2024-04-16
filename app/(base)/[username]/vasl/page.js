import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Profile from "@/components/user/Profile";
import BackButton from "@/components/user/BackButton";
import VaslItem from "@/components/vasl/VaslItem";

const vasl = async ({ params }) => {
  const supabase = createClient();
  const { data } = await supabase.from("user").select().eq("username", params.username);
  if (!data) redirect("/home");

  return (
    <>
      <header className="px-6 py-4 flex items-center justify-between">
        <Profile
          profile={data[0].profile}
          fullname={data[0].fullname}
          username={data[0].username}
          small={true}
        />
        <BackButton className={"text-4xl"} />
      </header>
      <h1 className="text-5xl px-6 py-2 font-kalameh">لیسـت متصـــــل ها</h1>
      <div className="flex flex-col gap-2 py-2">
        {data[0].vasl.length === 0 && (
          <p className="px-6 font-alibaba text-lg">
            این کــاربر هنوز به کــسی وصـــل نیست ! شایدم با وصــــلیم به اون بالا ها وصل شده!
          </p>
        )}
        {data[0].vasl.map((username) => (
          <VaslItem username={username} key={username} />
        ))}
      </div>
    </>
  );
};

export default vasl;
