import "./globals.css";
import Provider from "./Provider";
import { Noto } from "../font";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={Noto.variable + " font"}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
