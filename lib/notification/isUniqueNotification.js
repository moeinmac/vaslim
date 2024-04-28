export const isUniqueNotification = (notification) => {
  const uniqueArray = notification.reduce((acc, current) => {
    const isDuplicate = acc.some(
      (item) =>
        item.type === "stamp" &&
        current.type === "stamp" &&
        item.pen_id === current.pen_id &&
        item.user_id === current.user_id
    );

    if (!isDuplicate) {
      acc.push(current);
    }

    return acc;
  }, []);
  return uniqueArray;
};
