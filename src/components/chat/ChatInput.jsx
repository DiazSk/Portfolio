import { resumeData } from "../../constants/resumeData";

const ChatInput = ({
  input,
  setInput,
  onSubmit,
  onSuggestedQuestion,
  loading,
  hasMessages,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!loading && input.trim()) {
        onSubmit(event);
      }
    }
  };

  return (
    <div className="border-t border-white/10 bg-black/40 px-4 py-4">
      {!hasMessages && (
        <div className="mb-3 flex flex-wrap gap-2">
          {resumeData.suggestedQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => onSuggestedQuestion(question)}
              disabled={loading}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 transition-colors hover:border-purple-400/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {question}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex items-end gap-2">
        <div className="flex-1">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value.slice(0, 700))}
            onKeyDown={handleKeyDown}
            placeholder="Ask about my data engineering experience..."
            rows={2}
            disabled={loading}
            className="field-input field-input-focus mt-0 min-h-11 resize-none border-white/10 bg-white/5 text-white placeholder:text-neutral-500"
          />
          <div className="mt-1 flex items-center justify-between px-1">
            <p className="text-[11px] text-neutral-500">
              {loading ? "Streaming response..." : "Press Enter to send"}
            </p>
            <p className="text-[11px] text-neutral-500">{input.length}/700</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="min-h-11 rounded-lg bg-royal px-4 text-sm font-medium text-white transition-all hover:bg-lavender hover:shadow-lg hover:shadow-royal/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Streaming" : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
