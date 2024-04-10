import { headers } from "next/headers";

const vasl = ({params}) => {
  const heads = headers();
  const pathname = heads.get("next-url");
  console.log(params);
  return <h1>hi</h1>;
};

export default vasl;
