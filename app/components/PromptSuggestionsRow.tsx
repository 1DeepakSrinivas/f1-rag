import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionsRow = ({ onPromptClick }) => {
  const propmts = [
    "Who is the head of Ferrari's F1 Academy Team?",
    "Who is the highest paid F1 driver?",
    "Who is the current F1 World Driver's Champion?",
    "Who is the current F1 Constructors Champion?",
    "Who is the youngest F1 World Champion?",
  ];
  return (
    <div className="">
      {propmts.map((prompt, index) => (
        <PromptSuggestionButton
          key={`suggestion-${index}`}
          text={prompt}
          onclick={() => onPromptClick(prompt)}
        />
      ))}
    </div>
  );
};

export default PromptSuggestionsRow;
