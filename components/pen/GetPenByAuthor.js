import { getPenByAuthor } from "@/lib/pen/getPenByAuthor";
import HomePenItem from "./HomePenItem";

const GetPenByAuthor = async ({ username, myUsername, count }) => {
  const data = await getPenByAuthor(username, count);
  console.log(data);
  return (
    <>
      {data.pens.map((pen) => (
        <HomePenItem
          key={pen.id}
          pen={pen}
          profile={data.user.profile}
          fullname={data.user.fullname}
          username={data.user.username}
          myUsername={myUsername}
        />
      ))}
    </>
  );
};

export default GetPenByAuthor;
