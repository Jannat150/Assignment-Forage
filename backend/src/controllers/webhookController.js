
const { generateLLMResponse } = require("../services/llmService");
const { sendMessage } = require("../services/whatsappService");
const {
  WELCOME_MESSAGE,
  EMPTY_MESSAGE_REPLY,
  FALLBACK_MESSAGE,
  REPLY_DELAY_MS,
  DUPLICATE_WINDOW_MS,
  PREDEFINED_RESPONSES,
} = require("../utils/constants");

const recentMessages = new Map();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeMessage(message) {
  return message.trim().replace(/\s+/g, " ");
}

function isDuplicate(from, message) {
  const key = `${from}:${message.toLowerCase()}`;
  const now = Date.now();
  const lastSeen = recentMessages.get(key);

  if (lastSeen && now - lastSeen < DUPLICATE_WINDOW_MS) {
    return true;
  }

  recentMessages.set(key, now);
  setTimeout(() => recentMessages.delete(key), DUPLICATE_WINDOW_MS);
  return false;
}

function detectIntent(message) {
  const normalized = message.toLowerCase();

  if (/price|pricing|fee|fees|cost|payment/.test(normalized)) {
    return "pricing";
  }

  if (/enroll|enrollment|join|admission|register|signup|sign up/.test(normalized)) {
    return "enrollment";
  }

  if (/module|modules|structure|course|curriculum|units/.test(normalized)) {
    return "structure";
  }

  if (/certificate|certification|certified/.test(normalized)) {
    return "certificate";
  }

  return null;
}

async function sendDelayedReply(to, text) {
  await sleep(REPLY_DELAY_MS);
  await sendMessage(to, text);
}

async function handleWebhook(req, res) {
  const message = req.body?.message?.text;
  const from = req.body?.from;

  if (typeof from !== "string" || typeof message !== "string") {
    return res.sendStatus(200);
  }

  const cleanMessage = normalizeMessage(message);

  if (!cleanMessage) {
    await sendDelayedReply(from, EMPTY_MESSAGE_REPLY);
    return res.sendStatus(200);
  }

  if (isDuplicate(from, cleanMessage)) {
    return res.sendStatus(200);
  }

  if (cleanMessage.toLowerCase() === "ai-academy") {
    await sendDelayedReply(from, WELCOME_MESSAGE);
    return res.sendStatus(200);
  }

  const intent = detectIntent(cleanMessage);

  if (intent && PREDEFINED_RESPONSES[intent]) {
    await sendDelayedReply(from, PREDEFINED_RESPONSES[intent]);
    return res.sendStatus(200);
  }

  const reply = await generateLLMResponse(cleanMessage);
  await sendDelayedReply(from, reply || FALLBACK_MESSAGE);

  return res.sendStatus(200);
}

module.exports = { handleWebhook };
