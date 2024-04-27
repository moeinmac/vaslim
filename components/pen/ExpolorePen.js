import { createExplorePen } from "@/lib/pen/createExplorePen";
import HomePenItem from "./HomePenItem";

const ExpolorePen = async ({ vasl, id }) => {
  const allData = await createExplorePen(vasl, id);
  return (
    <div className="flex flex-col gap-4 px-6">
      {allData.map((pen) => (
        <HomePenItem pen={pen} myid={id} key={pen.id} />
      ))}
    </div>
  );
};

export default ExpolorePen;
