import "./globals.css";
import Provider from "./Provider";
import { Noto } from "../font";
import Header from "@/components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={Noto.variable + " font"}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
