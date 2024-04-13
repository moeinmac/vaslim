import { pickRandom } from "@/lib/getAvailableSuggests";
import GetPenByAuthor from "./GetPenByAuthor";
import GetAllPens from "./GetAllPens";

const HomePen = ({ vasl, myUsername }) => {
  // const randomUsers = pickRandom(vasl, vasl.length < 5 ? vasl.length : 5);
  const randomUsers = ["moein.mac", "M.valipour", "mobingiran"];

  return (
    <div className="flex flex-col gap-4 px-6 pt-4">
      {randomUsers.map((username) => (
        <GetPenByAuthor key={username} count={2} username={username} myUsername={myUsername}/>
      ))}
      {/* <GetAllPens usernames={randomUsers} count={2} myUsername={myUsername} /> */}
    </div>
  );
};

export default HomePen;
