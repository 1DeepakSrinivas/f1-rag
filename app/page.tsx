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
      // Log errors to console instead of showing them in the UI
      console.error(
        "Chat error:",
        error.message || "An unexpected error occurred"
      );
    },
    onResponse: (response) => {
      // Remove custom response handling since useChat will automatically
      // handle the response and update the messages state
      console.log("API Response received:", response);
    },
  });

  // Add prompt text directly to the chat
  const handlePrompt = (promptText: string) => {
    append({
      id: crypto.randomUUID(),
      content: promptText,
      role: "user",
    });
  };

  // Filter out system messages when displaying
  const displayMessages = messages.filter(
    (message) => message.role !== "system"
  );
  const noMessages = !displayMessages || displayMessages.length === 0;

  return (
    <main className="flex flex-col justify-between align-center mt-14 mx-6 md:mx-20 lg:mx-60 bg-white shadow-md p-6 md:p-10 rounded-lg min-h-[600px]">
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
        className={`flex-grow overflow-y-auto ${
          noMessages ? "" : "populated"
        } py-4`}
      >
        {noMessages ? (
          <div>
            <p className="text-lg text-black pt-10">
              The ultimate F1 Chatbot. Ask F1-GPT anything about the sport of
              Formula One and receive accurate answers.
            </p>
            <br />
            <PromptSuggestionsRow onPromptClick={handlePrompt} />
          </div>
        ) : (
          <div className="space-y-4">
            {displayMessages.map((message, index) => (
              <Bubble key={`message-${index}`} message={message} />
            ))}
            {isLoading && <LoadingBubble />}
          </div>
        )}
      </section>

      {/* Input Section */}
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex items-center justify-center w-full"
      >
        <input
          className="flex-grow w-full max-w-2xl p-2 border-2 border-gray-100 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-500"
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
