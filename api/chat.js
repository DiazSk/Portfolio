import OpenAI from "openai";
import { buildSystemPrompt } from "../src/lib/buildSystemPrompt.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MAX_MESSAGES = 14;
const MAX_USER_MESSAGE_CHARS = 700;

function containsBlockedContent(text) {
  const blockedPatterns = [
    /\b(nude|porn|sexual|sex\s*chat)\b/i,
    /\b(kill|murder|bomb\s*making|explosive\s*device)\b/i,
    /\b(racist|hate\s*speech|ethnic\s*cleansing)\b/i,
  ];

  return blockedPatterns.some((pattern) => pattern.test(text));
}

function normalizeMessages(messages) {
  return messages
    .filter((message) => message?.role && message?.content)
    .map((message) => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: String(message.content).trim(),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-MAX_MESSAGES);
}

function writeSse(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: "Missing OPENAI_API_KEY environment variable",
    });
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages payload" });
    }

    const safeMessages = normalizeMessages(messages);
    const latestUserMessage = [...safeMessages]
      .reverse()
      .find((message) => message.role === "user");

    if (!latestUserMessage) {
      return res.status(400).json({ error: "No user message found" });
    }

    if (latestUserMessage.content.length > MAX_USER_MESSAGE_CHARS) {
      return res.status(400).json({
        error: `Please keep questions under ${MAX_USER_MESSAGE_CHARS} characters for best results.`,
      });
    }

    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    if (res.flushHeaders) res.flushHeaders();

    if (containsBlockedContent(latestUserMessage.content)) {
      writeSse(res, {
        type: "token",
        content:
          "I’d like to keep this focused on my professional background. Feel free to ask about my projects, experience, skills, or role fit.",
      });
      writeSse(res, { type: "done" });
      return res.end();
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.35,
      max_tokens: 500,
      stream: true,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...safeMessages,
      ],
    });

    for await (const chunk of completion) {
      const token = chunk?.choices?.[0]?.delta?.content;
      if (token) {
        writeSse(res, { type: "token", content: token });
      }
    }

    writeSse(res, { type: "done" });
    return res.end();
  } catch (error) {
    console.error("/api/chat error:", error);
    if (!res.headersSent) {
      return res.status(500).json({
        error: "Failed to get AI response",
        details: error?.message || "Unknown error",
      });
    }

    writeSse(res, {
      type: "error",
      message: "Failed to stream AI response",
    });
    return res.end();
  }
}
