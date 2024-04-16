import HomePenItem from "./HomePenItem";

const ExpolorePen = ({penData , myUsername}) => {

  return (
    <div className="flex flex-col gap-4 px-6">
      {penData.map((pen) => (
        <HomePenItem pen={pen} myUsername={myUsername} key={pen.id} />
      ))}
    </div>
  );
};

export default ExpolorePen;
