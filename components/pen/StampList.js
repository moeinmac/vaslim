import { getUsersByPrimary } from "@/lib/getUsersByPrimary";
import UserItem from "../user/UserItem";

const StampList = async ({ stamp }) => {
  const userdata = await getUsersByPrimary(stamp, true, [
    "profile",
    "username",
    "isVerified",
    "fullname",
  ]);

  return (
    <div className="flex flex-col penItem_bg p-2 mx-3 mt-0  mb-[8rem] bg-black rounded-bl-lg rounded-br-lg">
      <h1 className="font-kalameh text-3xl bg-black pt-3 px-4 rounded-tl-lg rounded-tr-lg">
        لیست مُهر کـــننده ها :{" "}
      </h1>
      <div className="bg-black rounded-bl-lg rounded-br-lg py-2">
        {userdata.map((data) => (
          <UserItem data={data} key={data.username} path={data.username} small/>
        ))}
      </div>
    </div>
  );
};

export default StampList;
