import MobileTabbar from "@/components/tabbar/MobileTabbar";
import { pickRandom } from "@/lib/getAvailableSuggests";

const loading = () => {
  const hints = [
    "صــبور باش جــان دلم...",
    "با وصــلیم به اون بالا ها وصــلین...",
    "در حــال آمــاده سازی...",
    "با وصــلیم به اون بالا ها وصــلین...",
    "یکـــم صبر کن...",
    "در حال آماده کــردن چــاپار خانه شما",
  ];
  const loadingHint = pickRandom(hints, 1);
  return (
    <main>
      <div className="flex justify-center items-center flex-col gap-4 h-[85vh] px-4">
        <div className="loader"></div>
        <h1 className="font-kalameh text-3xl text-center">{loadingHint[0]}</h1>
      </div>
      <MobileTabbar />
    </main>
  );
};

export default loading;
