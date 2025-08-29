// import "./fontiran.css";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { iransansx } from "@/fonts/localFont";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "safa30",
  description: "safa30",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={iransansx.className}>
      <body>
        {" "}
        <Toaster position="top-center" reverseOrder={false} />
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
