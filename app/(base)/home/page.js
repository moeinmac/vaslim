import SignOutForm from "@/components/Auth/SignoutForm";
import HomePens from "@/components/pen/homePens";
import Link from "next/link"

const Home =  () => {
  
  return <>
  <h1 className="font-kalameh text-5xl p-6">وصـــلیم</h1>
  <div className="font-kalameh bg-orange text-3xl p-6">
    بخش نقطه(در حال توسعه)
  </div>
  <HomePens />
  <Link href="/moein.mac" >معین</Link>
  </>;
};

export default Home;
