"use client";

import { getPenByAuthor } from "@/lib/pen/getPenByAuthor";
import HomePenItem from "./HomePenItem";
import { useEffect, useState } from "react";

const fetchAllData = async () => {};

const GetAllPens = ({ usernames, myUsername, count }) => {
  // const [pens, setPens] = useState([]);
  // const [authors, setAuthors] = useState([]);

  const getData = async (username) => {
    return await getPenByAuthor(username, count);
  };
  const fetchAllPens = () => {
    usernames.forEach((username) => {
      const response = getData(username);
      response.then((data) => {
        setPens((prevState) => [...prevState, ...data.pens]);
        // setAuthors((prevState) => [...prevState, data.user]);
      });
    });
  };

  useEffect(() => {
    fetchAllPens();
  }, []);

  // console.log(Array.from(new Set(pens)));
  // authors.forEach((author)=> {
  //   console.log(author.fullname);
  // })

  return (
    <>
      {/* {data.pens.map((pen) => (
        <HomePenItem
          key={pen.id}
          pen={pen}
          profile={data.user.profile}
          fullname={data.user.fullname}
          username={data.user.username}
          myUsername={myUsername}
        />
      ))} */}
    </>
  );
};

export default GetAllPens;
