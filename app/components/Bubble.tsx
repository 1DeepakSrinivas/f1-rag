const Bubble = ({ message }) => {
  if (!message || !message.content) {
    console.error("Invalid message object:", message);
    return null;
  }

  const { content, role = "user" } = message;

  const bubbleStyles = {
    user: { backgroundColor: "#e0f7fa", alignSelf: "flex-end" },
    assistant: { backgroundColor: "#f1f1f1", alignSelf: "flex-start" },
    system: { backgroundColor: "#ffeb3b", alignSelf: "center", color: "black" }, // Style for system messages
  };

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "10px",
        maxWidth: "60%",
        ...bubbleStyles[role],
      }}
    >
      {content}
    </div>
  );
};

export default Bubble;
