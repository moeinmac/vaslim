import { pickRandom } from "@/lib/getAvailableSuggests";
import { getPenByAuthor } from "@/lib/pen/getPenByAuthor";
import HomePenItem from "./HomePenItem";

const getRequestedPens = async (usernames, count) => {
  const allData = [];
  for (const username of usernames) {
    const response = await getPenByAuthor(username, count);
    allData.push(response);
  }
  return allData;
};

const HomePen = async ({ vasl, myUsername }) => {
  const randomUsers = pickRandom(vasl, vasl.length < 7 ? vasl.length : 7);
  const allData = await getRequestedPens(randomUsers, 3);
  const createPens = [];
  for (const item of allData) {
    createPens.push(...item);
  }
  const sortedPens = createPens.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="flex flex-col gap-4 px-6 pt-4">
      {sortedPens.map((pen) => (
        <HomePenItem key={pen.id} pen={pen} myUsername={myUsername}/>
      ))}
    </div>
  );
};

export default HomePen;
