import Link from "next/link";

const SwitchHomePen = ({ explore }) => {
  return (
    <div className="mx-6 mt-4 mb-6 stamp py-4 px-6 rounded-2xl border-2 border-white flex items-center justify-between relative">
      <div
        className={`${
          explore ? "left-[0.8rem] px-[4.5rem]" : "right-3"
        } bg-[#5D85DD] absolute py-6 px-12 rounded-xl
        switch_home
        `}
      ></div>
      <Link href={"/home"} className={`font-kalameh text-4xl relative z-10`}>
        چـاپــار
      </Link>
      <Link href={`home/explore`} className={`font-kalameh text-4xl relative z-10`}>
        بازار مکــــاره
      </Link>
    </div>
  );
};

export default SwitchHomePen;
