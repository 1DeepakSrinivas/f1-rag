"use client";

import Image from "next/image";
import logo from "./assets/logo.png";
import { useChat } from "ai/react";
import { Message } from "ai";
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
      console.error("Chat error:", error);
    },
  });

  const handlePrompt = (promptText: string) => {
    append({
      id: crypto.randomUUID(),
      content: promptText,
      role: "user",
    });
  };

  const noMessages = !messages || messages.length === 0;

  return (
    <main className="flex flex-col justify-between align-center mt-14 mx-60 bg-white shadow-md p-10 rounded-lg min-h-[600px]">
      <div className="flex flex-row items-center justify-center">
        <Image
          src={logo}
          width={250}
          height={100}
          alt="f1 logo"
          className="object-contain"
        />
        <p className="text-center text-9xl font-mono">GPT</p>
      </div>

      <section
        className={`flex-grow overflow-y-auto ${noMessages ? "" : "populated"}`}
      >
        {noMessages ? (
          <>
            <p className="text-lg text-black pt-10">
              The ultimate F1 Chatbot. Ask F1-GPT anything about the sport of
              Formula One and receive accurate answers.
            </p>
            <br />
            <PromptSuggestionsRow onPromptClick={handlePrompt} />
          </>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <Bubble key={`message-${index}`} message={message} />
            ))}
            {isLoading && <LoadingBubble />}
          </div>
        )}
      </section>

      <form
        onSubmit={handleSubmit}
        className="mt-4 justify-center text-black overflow-hidden w-full py-4 px-8 border-none bg-red-100 rounded-lg"
      >
        <input
          className="justify-center w-full p-2 border-2 rounded-sm text-black overflow-hidden focus:outline-none"
          onChange={handleInputChange}
          value={input}
          placeholder="Ask me anything..."
        />
      </form>
    </main>
  );
};

export default Home;
