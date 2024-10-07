import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";

const noto_Sans = Noto_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={noto_Sans.className}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
