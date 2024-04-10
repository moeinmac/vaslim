import Link from "next/link";

const VaslButton = ({ vasl }) => {
  return (
    <Link href={"/vasl"} className="font-kalameh text-3xl flex flex-col">
      <span className="text-center">{vasl}</span>
      <span className="font-alibaba text-base">متصل</span>
    </Link>
  );
};

export default VaslButton;
