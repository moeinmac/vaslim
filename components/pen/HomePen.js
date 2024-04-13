import { pickRandom } from "@/lib/getAvailableSuggests";
import GetPenByAuthor from "./GetPenByAuthor";

const HomePen = ({ vasl , myUsername }) => {
  const randomUsers = pickRandom(vasl, vasl.length < 5 ? vasl.length : 5);
  return (
    <div className="flex flex-col gap-4 px-6 pt-4">
      {randomUsers.map((username) => (
        <GetPenByAuthor key={username} username={username} myUsername={myUsername}/>
      ))}
    </div>
  );
};

export default HomePen;
