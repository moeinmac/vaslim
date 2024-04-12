"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import UserPenItem from "./UserPenItem";

const UserPen = ({ username, id }) => {
  const supabase = createClient();
  const fakepens = [
    {
      id: 256,
      author: "ab968741-38ff-4499-9551-5971515da625",
      pen: "سلام به همه!",
      stamps: [],
      created_at : "2024-04-12 17:17:21.10524+00",
      comments: [],
    },
    {
      id: 25855,
      author: "ab968741-38ff-4499-9551-5971515da625",
      pen: "سلامی مجدد" ,
      stamps: [],
      created_at : "2024-04-12 17:19:32.624542+00",
      comments: [],
    },
  ];

  const [pens, setAllPens] = useState(fakepens);

  const getAllPen = async () => {
    if (username) {
      const id = await supabase.from("user").select("id").eq("username", username);
      const { data } = await supabase.from("pen").select().eq("author", id);
      setAllPens(data);
    }
    if (id) {
      const { data } = await supabase.from("pen").select().eq("author", id);
      setAllPens(data);
    }
  };
  // useEffect(() => {
  //   getAllPen();
  // }, []);

  console.log(pens);

  return (
    <div className="flex justify-center flex-col gap-4 px-6 py-4">
      {pens.map((pen) => (
        <UserPenItem pen={pen} key={pen.id} />
      ))}
    </div>
  );
};

export default UserPen;
