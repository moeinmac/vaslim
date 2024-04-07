import MobileTabbar from "@/components/tabbar/MobileTabbar"

const baseLayout = ({children}) => {
  return <main>
    {children}
    <MobileTabbar />
  </main>
}

export default baseLayout