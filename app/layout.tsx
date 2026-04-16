import "./globals.css";
import Providers from "./providers";

export const metadata = {
  // title: "Elas no Poder",
  // description: "Descrição...",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
