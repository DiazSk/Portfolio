/*
 * node --test api/contact.test.mjs
 *
 * Node's built-in runner, no dependency and no config. Covers the two things
 * in this file that can be wrong silently: the escaping (the previous version
 * interpolated all three fields raw into HTML) and the validation gate.
 *
 * Importing this module must not need RESEND_API_KEY — the client is built
 * lazily for exactly that reason.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { escapeHtml, validate, notificationTemplate, notificationText } from "./contact.js";

const good = { name: "Jane Doe", email: "jane@acme.com", message: "Hello." };

test("escapeHtml neutralises every HTML-significant character", () => {
  assert.equal(escapeHtml(`<script>`), "&lt;script&gt;");
  assert.equal(escapeHtml(`"quoted"`), "&quot;quoted&quot;");
  assert.equal(escapeHtml(`it's`), "it&#39;s");
  // Ampersand first, or the other replacements get double-escaped.
  assert.equal(escapeHtml(`a & <b>`), "a &amp; &lt;b&gt;");
});

test("a message carrying markup renders inert", () => {
  const message = escapeHtml(`<img src=x onerror="alert(1)">`).replace(/\n/g, "<br>");
  const html = notificationTemplate({ ...good, message, receivedAt: "now" });
  assert.ok(!html.includes("<img"), "raw tag reached the output");
  assert.ok(!html.includes("onerror=\""), "a live attribute reached the output");
  assert.ok(html.includes("&lt;img"), "the escaped form is missing");
});

test("newlines become breaks without opening a hole", () => {
  const message = escapeHtml("one\n<b>two</b>").replace(/\n/g, "<br>");
  assert.equal(message, "one<br>&lt;b&gt;two&lt;/b&gt;");
});

test("validate accepts a good payload", () => {
  assert.equal(validate(good), null);
});

test("validate rejects each missing or blank field", () => {
  for (const field of ["name", "email", "message"]) {
    assert.equal(validate({ ...good, [field]: "" }), `Missing ${field}`);
    assert.equal(validate({ ...good, [field]: "   " }), `Missing ${field}`);
    assert.equal(validate({ ...good, [field]: undefined }), `Missing ${field}`);
  }
});

test("validate rejects a malformed email", () => {
  for (const email of ["jane", "jane@acme", "jane acme.com", "@acme.com"]) {
    assert.equal(validate({ ...good, email }), "Invalid email", email);
  }
});

test("validate caps the field lengths", () => {
  assert.equal(
    validate({ ...good, message: "x".repeat(5001) }),
    "message exceeds 5000 characters",
  );
  assert.equal(validate({ ...good, name: "x".repeat(101) }), "name exceeds 100 characters");
});

test("the template carries the design system and none of the retired one", () => {
  const html = notificationTemplate({ ...good, message: "Hello.", receivedAt: "now" });
  assert.ok(html.includes("#FF3B14"), "the field colour is missing");
  assert.ok(html.includes("#0A0A09"), "field-ink is missing");
  // Black on the field, never white.
  assert.ok(!/background:#FF3B14[^"]*"[^>]*#F7F8F8/.test(html));
  for (const retired of ["667eea", "764ba2", "80GB", "border-radius"]) {
    assert.ok(!html.includes(retired), `${retired} survived`);
  }
});

test("the text part carries raw values, not entities", () => {
  const text = notificationText({
    name: "Jane & Co",
    email: "jane@acme.com",
    message: "Line one\nLine two",
    receivedAt: "now",
  });
  // A text part must not contain HTML entities — they would read literally.
  assert.ok(!text.includes("&amp;"), "an entity leaked into the text part");
  assert.ok(text.includes("Jane & Co"));
  assert.ok(text.includes("Line one\nLine two"), "newlines should survive as newlines");
  assert.ok(!text.includes("<"), "no markup in the text part");
});
