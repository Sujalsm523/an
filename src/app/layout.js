import "./globals.css";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"], // You can adjust the weights you need
});

export const metadata = {
  title: "My App",
  description: "Windows-style error popups with style",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dancingScript.className}>{children}</body>
    </html>
  );
}
