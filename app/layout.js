import "./globals.css";
import localFont from "next/font/local";

const alibaba = localFont({
  src: [
    {
      path: "../public/font/alibaba-bold.woff2",
      weight: "700",
    },
    {
      path: "../public/font/alibaba-regular.woff2",
      weight: "400",
    },
  ],
  variable: "--alibaba",
});

const kalameh = localFont({ src: "../public/font/KalamehWeb_Black.woff2", variable: "--kalameh" });

export const metadata = {
  title: "وصلیم",
  description: "شبکه اجتماعی وصلیم",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${alibaba.variable} ${kalameh.variable} bg-black text-white`}>
        {children}
        <div id="overlay"></div>
      </body>
    </html>
  );
}
