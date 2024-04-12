import { timeSince, toFarsiNumber } from "@/lib/timeSince";

const UserPenItem = ({ pen }) => {
  const convertedDate = new Date(pen.created_at);
  console.log(timeSince(convertedDate));
  console.log(toFarsiNumber(123));
  return (
    <div className="penItem_container rounded-xl">
      <div className="penItem_bg">
        <header>
          <p></p>
        </header>
        {pen.pen}
      </div>
    </div>
  );
};

export default UserPenItem;
