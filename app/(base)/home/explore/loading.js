import MobileTabbar from "@/components/tabbar/MobileTabbar";
import { pickRandom } from "@/lib/getAvailableSuggests";

const loading = () => {
  const hints = [
    `تو بـــازار مکــــاره
    که سقف آبی داره...`,
    `تو بـــازار مکــــــاره
    هر کی تو جنب و جوشه...
    `,
  ];
  const loadingHint = pickRandom(hints, 1);
  return (
    <main>
      <div className="flex justify-center items-center flex-col gap-4 h-[85vh] px-4">
        <div className="loader"></div>
        <h1 className="font-kalameh text-3xl text-center whitespace-pre-wrap">{loadingHint[0]}</h1>
      </div>
      <MobileTabbar />
    </main>
  );
};

export default loading;
