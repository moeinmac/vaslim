import { pickRandom } from "@/lib/getAvailableSuggests";
import HomePenItem from "./HomePenItem";
import SuggestUser from "../search/SuggestUser";
import { getRequestedPens } from "@/lib/pen/getRequestedPens";



const HomePen = async ({ vasl, myUsername }) => {
  if (vasl.length === 0)
    return (
      <div className="flex flex-col">
        <p className="font-alibaba text-xl px-3">
          هنوز به کسی وصـــل نیستی ، میتونی دوستات رو با جستجو پـیدا کــنی یا
        </p>
        <SuggestUser text={"لیست پیشــنهادی"} />
      </div>
    );
  const randomUsers = pickRandom(vasl, vasl.length < 7 ? vasl.length : 7);
  const allData = await getRequestedPens(randomUsers, 3);
  const createPens = [];
  for (const item of allData) {
    createPens.push(...item);
  }
  if (createPens.length === 0) {
    return (
      <div className="flex flex-col">
        <p className="font-alibaba text-xl px-3">
          افرادی که به آن ها وصل هستید خیلی فعال نیستند و از آنها نوشته ای یافت نشد.
        </p>
        <SuggestUser text={"لیست پیشــنهادی"} />
      </div>
    );
  }
  const sortedPens = createPens.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return (
    <div className="flex flex-col gap-4 px-6">
      {sortedPens.map((pen) => (
        <HomePenItem key={pen.id} pen={pen} myUsername={myUsername} />
      ))}
    </div>
  );
};

export default HomePen;
