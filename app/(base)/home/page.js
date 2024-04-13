import SignOutForm from "@/components/Auth/SignoutForm";
import BellButton from "@/components/notification/BellButton";
import HomePen from "@/components/pen/HomePen";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const Home = async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  let { data } = await supabase.from("user").select().eq("id", myAuth.data.user.id);
  return (
    <>
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="font-kalameh text-5xl ">وصـــلیم</h1>
        <BellButton myUsername={data[0].username} />
      </header>
      <div className="font-kalameh bg-orange text-3xl p-6">بخش نقطه(در حال توسعه)</div>
      <SignOutForm />
      <HomePen vasl={data[0].vasl} myUsername={data[0].username} />
    </>
  );
};

export default Home;
