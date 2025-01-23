"use client";

import Image from "next/image";
import logo from "./assets/logo.png";
import { useChat } from "ai/react";
import LoadingBubble from "./components/LoadingBubble";
import PromptSuggestionsRow from "./components/PromptSuggestionsRow";
import Bubble from "./components/Bubble";

const Home = () => {
  const {
    isLoading,
    messages,
    append,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error(
        "Chat error:",
        error.message || "An unexpected error occurred"
      );
    },
    onResponse: (response) => {
      console.log("API Response received:", response);
    },
  });

  const handlePrompt = (promptText: string) => {
    append({
      id: crypto.randomUUID(),
      content: promptText,
      role: "user",
    });
  };

  // Filter out system messages and check if there are any display messages
  const displayMessages = messages.filter(
    (message) => message.role !== "system"
  );
  const noMessages = displayMessages.length === 0;

  const chatContent = noMessages ? (
    <div>
      <p className="text-lg text-black pt-10 px-4">
        The ultimate F1 Chatbot. Ask F1-GPT anything about the sport of Formula
        One and receive accurate answers.
      </p>
      <PromptSuggestionsRow onPromptClick={handlePrompt} />
    </div>
  ) : (
    <div className="space-y-4">
      {displayMessages.map((message) => (
        <Bubble key={message.id} message={message} />
      ))}
      {isLoading && <LoadingBubble />}
    </div>
  );
  console.log(chatContent);

  return (
    <main className="flex flex-col justify-between align-center mt-14 mx-6 md:mx-20 lg:mx-60 bg-[#F2F9FF] shadow-md p-6 md:p-10 rounded-lg min-h-[600px]">
      {/* Header Section */}
      <div className="flex flex-row items-center justify-center">
        <Image
          src={logo}
          width={250}
          height={100}
          alt="F1 logo"
          className="object-contain"
        />
        <p className="text-center text-6xl md:text-9xl font-mono">GPT</p>
      </div>

      {/* Chat Section */}
      <section
        className={`flex-grow overflow-y-scroll ${
          noMessages ? "" : "populated"
        } py-4`}
      >
        {chatContent}
      </section>

      {/* Input Section */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            handleSubmit();
          }
        }}
        className="mt-4 flex items-center justify-center w-full"
      >
        <input
          className="flex-grow w-full p-2 border-2 border-gray-100 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-transparent focus:shadow-md"
          onChange={handleInputChange}
          value={input}
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-300 focus:outline-none"
        >
          Send
        </button>
      </form>
    </main>
  );
};

export default Home;
