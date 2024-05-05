import GetDot from "@/components/dot/GetDot";
import BellButton from "@/components/notification/BellButton";
import HomePen from "@/components/pen/HomePen";
import SwitchHomePen from "@/components/pen/SwitchHomePen";
import SuggestUser from "@/components/search/SuggestUser";
import { FAKEDOTDATA } from "@/lib/FAKEDOTDATA";
import { fetchHomePen } from "@/lib/pen/fetchHomePen";
import { createClient } from "@/lib/supabase/server";

const Home = async () => {
  const supabase = createClient();
  const myAuth = await supabase.auth.getUser();
  const { data } = await supabase
    .from("user")
    .select("username,profile,vasl")
    .eq("id", myAuth.data.user.id)
    .single();

  const firstPagePen = await fetchHomePen(data.vasl, 1);
  return (
    <>
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="font-kalameh text-5xl ">وصـــلیم</h1>
        <BellButton myid={myAuth.data.user.id} />
      </header>
      <GetDot
        dotData={FAKEDOTDATA}
        myProfile={data.profile}
        isBlur={data.vasl.length > 1 ? true : false}
      />
      <SwitchHomePen />
      {firstPagePen.length > 0 ? (
        <HomePen initPens={firstPagePen} vasl={data.vasl} myid={myAuth.data.user.id} />
      ) : (
        <div className="flex flex-col">
          <p className="font-alibaba text-xl px-3">
            به وصـــلیم خوش اومدی ، میتونی به افراد زیر وصل شی یا از قسمت جستجو دنبال دوستات بگردی
          </p>
          <SuggestUser myid={myAuth.data.user.id} text={"لیست پیشــنهادی"} />
        </div>
      )}
    </>
  );
};

export default Home;
