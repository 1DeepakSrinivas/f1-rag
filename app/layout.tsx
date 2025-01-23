import "../styles/globals.css";

export const metadata = {
  title: "F1-GPT",
  description: "A Formula 1 GPT to answer all your F1 questions",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
