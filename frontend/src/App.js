
import React, { useState } from "react";

const quickPrompts = ["AI-Academy", "What is the course price?", "How do I enroll?"];

const cardStyle = {
  background: "rgba(255, 255, 255, 0.92)",
  border: "1px solid rgba(15, 23, 42, 0.08)",
  borderRadius: 20,
  boxShadow: "0 18px 50px rgba(15, 23, 42, 0.12)",
};

export default function App() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const text = message.trim();

    if (!text) {
      alert("Type a message first.");
      return;
    }

    alert(`Demo only: send \"${text}\" through WhatsApp to test the chatbot flow.`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        background:
          "radial-gradient(circle at top left, rgba(16, 185, 129, 0.18), transparent 28%), radial-gradient(circle at top right, rgba(59, 130, 246, 0.16), transparent 24%), linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
        color: "#0f172a",
        fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            ...cardStyle,
            padding: 28,
            marginBottom: 20,
            display: "grid",
            gap: 18,
          }}
        >
          <div>
            <p style={{ margin: 0, color: "#0f766e", fontWeight: 700, letterSpacing: 0.4 }}>
              AI Academy WhatsApp Chatbot
            </p>
            <h1 style={{ margin: "10px 0 8px", fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.05 }}>
              Course support with a simple WhatsApp-first flow.
            </h1>
            <p style={{ margin: 0, maxWidth: 760, fontSize: 16, color: "#475569" }}>
              Ask about pricing, enrollment, modules, or certificates. The backend handles WhatsApp webhooks,
              applies course context, and responds only with safe, relevant answers.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            {[
              ["Entry message", 'User sends "AI-Academy" to start the flow.'],
              ["LLM response", "Context-bound answers for course questions."],
              ["Safety", "Human-like replies, no broadcast behavior, no spam."],
            ].map(([title, text]) => (
              <div key={title} style={{ padding: 16, background: "#f8fafc", borderRadius: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{title}</div>
                <div style={{ color: "#475569", lineHeight: 1.5 }}>{text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20 }}>
          <div style={{ ...cardStyle, padding: 24 }}>
            <h2 style={{ marginTop: 0, marginBottom: 12 }}>Try a demo prompt</h2>
            <p style={{ marginTop: 0, color: "#475569" }}>
              This UI is only a lightweight front door for the WhatsApp bot. Use one of the common queries below or
              type your own example.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setMessage(prompt)}
                  style={{
                    border: "1px solid #cbd5e1",
                    background: "#fff",
                    color: "#0f172a",
                    borderRadius: 999,
                    padding: "10px 14px",
                    cursor: "pointer",
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a WhatsApp-style question..."
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border: "1px solid #cbd5e1",
                  borderRadius: 14,
                  padding: "14px 16px",
                  fontSize: 15,
                  outline: "none",
                }}
              />
              <button
                type="button"
                onClick={handleSend}
                style={{
                  justifySelf: "start",
                  border: "none",
                  borderRadius: 14,
                  background: "#0f766e",
                  color: "white",
                  padding: "12px 18px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Send demo message
              </button>
            </div>
          </div>

          <div style={{ ...cardStyle, padding: 24 }}>
            <h3 style={{ marginTop: 0 }}>Bot behavior</h3>
            <ul style={{ margin: 0, paddingLeft: 18, color: "#475569", lineHeight: 1.8 }}>
              <li>Replies with a welcome message when the user starts with AI-Academy.</li>
              <li>Uses static course context for modules, pricing, enrollment, and certificates.</li>
              <li>Falls back to I don't know when the question is outside the course scope.</li>
              <li>Keeps responses short, relevant, and safe for WhatsApp usage.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
