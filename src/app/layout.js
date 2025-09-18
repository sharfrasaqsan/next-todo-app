import "bootstrap/dist/css/bootstrap.min.css";
import { DataProvider } from "@/context/DataContext";

export const metadata = { title: "Next + Firebase Todos" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-light">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
