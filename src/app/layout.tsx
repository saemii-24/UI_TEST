import "./globals.css";
import Provider from "./Provider";
import { Noto } from "../font";
import { MSWStarter } from "@/mock/MSWComponent";
import Header from "@/components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={Noto.variable + " font"}>
        <Provider>
          <MSWStarter>
            <Header />
            {children}
          </MSWStarter>
        </Provider>
      </body>
    </html>
  );
}
