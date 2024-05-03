import { createClient } from "./supabase/client";

export const getUsersByPrimary = async (users, isID, columns) => {
  const supabase = createClient();
  // const allData = [];
  // for (const user of users) {
  //   const response = await supabase
  //     .from("user")
  //     .select(columns.toString())
  //     .eq(`${isID ? "id" : "username"}`, user);
  //   allData.push(response.data[0]);
  // }
  // return allData;
  const { data } = await supabase
    .from("user")
    .select(columns.toString())
    .in(`${isID ? "id" : "username"}`, users);
  return data;
};

export const convertedPenItems = async (pens) => {
  const allData = [];
  for (const pen of pens) {
    const user = await getUsersByPrimary([pen.author], true, [
      "profile",
      "username",
      "fullname",
      "isVerified",
    ]);
    const penItem = {
      ...pen,
      ...user[0],
    };

    allData.push(penItem);
  }
  return allData;
};

export const convertUserItems = async (data, primary) => {
  const allData = [];
  for (const item of data) {
    const user = await getUsersByPrimary([item[primary]], true, [
      "profile",
      "username",
      "fullname",
      "isVerified",
    ]);
    const dataItem = {
      ...item,
      ...user[0],
    };

    allData.push(dataItem);
  }
  return allData;
};
