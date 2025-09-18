import "bootstrap/dist/css/bootstrap.min.css";
export const metadata = { title: "Next + Firebase Todos" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-light">{children}</body>
    </html>
  );
}
