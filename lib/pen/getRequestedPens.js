import { getPenByAuthor } from "./getPenByAuthor";

export const getRequestedPens = async (usernames, count) => {
  const allData = [];
  for (const username of usernames) {
    const response = await getPenByAuthor(username, count);
    allData.push(response);
  }
  return allData;
};