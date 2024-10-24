import "./globals.css";
import Provider from "./Provider";
import { Noto_Sans_KR } from "next/font/google";

export const noto_Sans = Noto_Sans_KR({
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
