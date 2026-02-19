import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-300 shadow-[0_0_20px_rgba(122,87,219,0.08)]">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-neutral-500" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-neutral-500 [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-neutral-500 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
};

const ChatMessages = ({ messages, loading }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chat-scrollbar h-[440px] overflow-y-auto px-4 py-4">
      {messages.length === 0 && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-neutral-300 shadow-[0_0_30px_rgba(87,219,150,0.06)]">
          Ask about my projects, pipeline scale, streaming architecture, optimization wins, or internship goals.
        </div>
      )}

      <div className="space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "rounded-tr-sm bg-gradient-to-r from-fuchsia via-royal to-lavender text-white shadow-[0_0_24px_rgba(122,87,219,0.25)]"
                  : "rounded-tl-sm border border-white/10 bg-white/5 text-neutral-200 shadow-[0_0_20px_rgba(51,194,204,0.08)]"
              }`}
            >
              {message.role === "user" ? (
                <p>{message.content}</p>
              ) : (
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                  {loading && message === messages[messages.length - 1] && (
                    <span className="ml-1 inline-block h-4 w-2 animate-pulse rounded-sm bg-aqua/80 align-middle" />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && <TypingIndicator />}
      </div>

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
