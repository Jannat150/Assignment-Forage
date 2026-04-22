
const axios = require("axios");
const { COURSE_CONTEXT, FALLBACK_MESSAGE, OUT_OF_SCOPE_MESSAGE } = require("../utils/constants");

const OPENAI_URL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

async function generateLLMResponse(userMessage) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return FALLBACK_MESSAGE;
    }

    const res = await axios.post(OPENAI_URL, {
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `${COURSE_CONTEXT}\nIf the user asks anything outside this context, reply exactly with: ${OUT_OF_SCOPE_MESSAGE}`,
        },
        { role: "user", content: userMessage }
      ],
      temperature: 0.2,
      max_tokens: 250,
    }, {
      timeout: 12000,
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
    });

    return res.data?.choices?.[0]?.message?.content?.trim() || FALLBACK_MESSAGE;
  } catch (error) {
    console.error("LLM error:", error.message);
    return FALLBACK_MESSAGE;
  }
}

module.exports = { generateLLMResponse };
