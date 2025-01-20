const Bubble = ({ message }) => {
  const { content, role = "user" } = message;
  console.log("Message in Bubble:", message);
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: role === "user" ? "#e0f7fa" : "#f1f1f1",
      }}
    >
      {content}
    </div>
  );
};

export default Bubble;
