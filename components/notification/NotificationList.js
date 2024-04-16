import NotifcationItem from "./NotificationItem";

const NotifcationList = ({ notification }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-kalameh text-4xl py-1 px-4">مـُــهر ها</h2>
      <div className="flex flex-col gap-2 px-4">
        {notification.map((data) => {
          if (data.type === "stamp") return <NotifcationItem data={data} />;
        })}
      </div>
      <h2 className="font-kalameh text-4xl py-1 px-4">نـــظر ها</h2>

      <div className="flex flex-col gap-2 px-4">
        {notification.map((data) => {
          if (data.type === "comment") return <NotifcationItem data={data} />;
        })}
      </div>
    </div>
  );
};

export default NotifcationList;
