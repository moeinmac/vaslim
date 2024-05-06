import GetDot from "@/components/dot/GetDot";
import BellButton from "@/components/notification/BellButton";
import HomePen from "@/components/pen/HomePen";
import SwitchHomePen from "@/components/pen/SwitchHomePen";
import SuggestUser from "@/components/search/SuggestUser";
import { FAKEDOTDATA } from "@/lib/FAKEDOTDATA";
import { fetchHomePen } from "@/lib/pen/fetchHomePen";
import { createClient } from "@/lib/supabase/server";
import { GiFastArrow } from "react-icons/gi";

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
      {data.vasl.length <= 1 && <GetDot dotData={FAKEDOTDATA} myProfile={data.profile} />}
      <SwitchHomePen />
      {firstPagePen.length > 0 ? (
        <HomePen initPens={firstPagePen} vasl={data.vasl} myid={myAuth.data.user.id} />
      ) : (
        <div className="flex flex-col">
          {data.vasl.length === 0 ? (
            <p className="font-alibaba text-xl px-4">
              به وصــــلیم خوش اومدی ، اینجا خیلی زود میتونی دوست پیدا کنی. مثلا اینا خوبن؟
            </p>
          ) : (
            <p className="font-alibaba text-xl px-4">
              افرادی که بهشون وصلی ، هنوز دست به قلم نشدند ! یه نگاهی به لیست زیر بنداز :
            </p>
          )}
          <SuggestUser myid={myAuth.data.user.id} text={"لیست پیشــنهادی"} carousel />
        </div>
      )}
    </>
  );
};

export default Home;
