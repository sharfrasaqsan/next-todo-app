import "bootstrap/dist/css/bootstrap.min.css";
import Providers from "./providers";

export const metadata = { title: "Next + Firebase Todos" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-light">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
