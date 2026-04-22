
const axios = require("axios");

async function sendMessage(to, text) {
  await axios.post("https://gate.whapi.cloud/messages/text",
    { to, body: text },
    { headers: { Authorization: `Bearer ${process.env.WHAPI_TOKEN}` } }
  );
}

module.exports = { sendMessage };
