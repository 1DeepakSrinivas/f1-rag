import React from "react";
import PropTypes from "prop-types"; // Prop validation for types

interface Message {
  content: string;
  role: "user" | "assistant" | "system";
}

interface BubbleProps {
  message: Message & { role: "user" | "assistant" | "system" | "data" };
}

const Bubble: React.FC<BubbleProps> = ({ message }) => {
  // Ensure the message has valid content before rendering
  if (!message || !message.content) {
    return null;
  }

  const { content, role = "user" } = message;

  // Dynamic class for different roles
  const bubbleClass = {
    user: "bubble user bg-[#e1f1ffff] ml-auto",
    assistant: "bubble assistant bg-[#dcb7ff]",
    system: "bubble system bg-[#f1f1f1]",
  };

  // Fallback to 'user' role if no valid role is provided
  const appliedClass = bubbleClass[role] || bubbleClass.user;

  return (
    <div className={appliedClass}>
      <div className="p-3 text-sm break-words">{content}</div>
    </div>
  );
};

// Prop validation using TypeScript
Bubble.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    role: PropTypes.oneOf(["user", "assistant", "system"]).isRequired,
  }).isRequired,
};

export default Bubble;
