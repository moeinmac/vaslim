import { getNotificationData } from "@/lib/notification/getNotificationData";
import NotifcationItem from "./NotificationItem";
import { isUniqueNotification } from "@/lib/notification/isUniqueNotification";

const NotifcationList = async ({ notification ,myid}) => {
  const uniqueNotif = isUniqueNotification(notification);
  const allData = await getNotificationData(uniqueNotif,myid);
  const stampNotif = allData.filter((data) => {
    if (data.type === "stamp") return data;
  });

  const commentNotif = allData.filter((data) => {
    if (data.type === "comment") return data;
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-kalameh text-4xl py-1 px-4">مـُــهر ها</h2>
      {stampNotif.length === 0 && <p className="font-alibaba px-4">هیچ اعلان جـدیدی وجود ندارد</p>}
      {stampNotif.length > 0 && (
        <div className="flex flex-col gap-5 px-4">
          {stampNotif.map((data) => (
            <NotifcationItem data={data} key={data.id} />
          ))}
        </div>
      )}
      <h2 className="font-kalameh text-4xl py-1 px-4">نـــظر ها</h2>

      {commentNotif.length === 0 && (
        <p className="font-alibaba px-4">هیچ اعلان جـدیدی وجود ندارد</p>
      )}
      {commentNotif.length > 0 && (
        <div className="flex flex-col gap-5 px-4">
          {commentNotif.map((data) => (
            <NotifcationItem data={data} key={data.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotifcationList;
