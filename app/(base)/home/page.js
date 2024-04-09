import SignOutForm from "@/components/Auth/SignoutForm";
import BellButton from "@/components/notification/BellButton";
import HomePens from "@/components/pen/homePens";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const Home =async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  let { data } = await supabase.from("user").select("username").eq("id", myAuth.data.user.id);
  return (
    <>
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="font-kalameh text-5xl ">وصـــلیم</h1>
        <BellButton myUsername={data[0].username}/>
      </header>
      <div className="font-kalameh bg-orange text-3xl p-6">بخش نقطه(در حال توسعه)</div>
      <HomePens />
      <Link href="/moein.mac">معین</Link>
      <SignOutForm />
    </>
  );
};

export default Home;
