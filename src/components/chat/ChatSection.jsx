import { useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const parseSseEvents = (chunk) => {
  return chunk
    .split("\n\n")
    .map((eventBlock) => {
      const line = eventBlock
        .split("\n")
        .find((eventLine) => eventLine.startsWith("data: "));
      if (!line) return null;

      try {
        return JSON.parse(line.replace("data: ", ""));
      } catch {
        return null;
      }
    })
    .filter(Boolean);
};

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim() || isStreaming) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
    };
    const assistantMessageId = crypto.randomUUID();

    const nextMessages = [...messages, userMessage];
    setMessages([
      ...nextMessages,
      {
        id: assistantMessageId,
        role: "assistant",
        content: "",
      },
    ]);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || "Failed to get response");
      }

      if (!response.body) {
        throw new Error("Streaming is unavailable in this environment");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const eventGroups = buffer.split("\n\n");
        buffer = eventGroups.pop() || "";

        const events = parseSseEvents(eventGroups.join("\n\n"));

        for (const event of events) {
          if (event.type === "token") {
            setMessages((current) =>
              current.map((message) =>
                message.id === assistantMessageId
                  ? { ...message, content: message.content + event.content }
                  : message
              )
            );
          }

          if (event.type === "error") {
            throw new Error(event.message || "Streaming failed");
          }
        }
      }

      setMessages((current) =>
        current.map((message) => {
          if (message.id !== assistantMessageId) return message;
          if (message.content.trim()) return message;
          return {
            ...message,
            content:
              "I don’t have a confident answer for that from my current resume data. Feel free to ask about my projects, experience, or role fit.",
          };
        })
      );
    } catch (error) {
      console.error(error);
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                content:
                  "I ran into an issue while responding. Please try again, or reach me directly at zaid07sk@gmail.com.",
              }
            : message
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleSuggestedQuestion = (question) => {
    sendMessage(question);
  };

  return (
    <section id="chat" className="c-space section-spacing flex items-center">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 text-center">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-neutral-300">
            AI-Powered Resume Q&A
          </p>
          <h2 className="text-heading">Ask My AI Resume</h2>
          <p className="mt-3 text-neutral-400">
            Recruiter-style Q&A for projects, skills, architecture decisions, and role fit.
          </p>
        </div>

        <div className="chat-shell overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <ChatMessages messages={messages} loading={isStreaming} />
          <ChatInput
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
            onSuggestedQuestion={handleSuggestedQuestion}
            loading={isStreaming}
            hasMessages={messages.length > 0}
          />
        </div>
      </div>
    </section>
  );
};

export default ChatSection;
