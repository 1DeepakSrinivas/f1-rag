import "../styles/globals.css";

export const metadata = {
  title: "F1-GPT",
  description: "A Formula 1 Grand Prix GPT",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
