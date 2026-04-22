
const COURSE_CONTEXT = `
AI Academy Course Details:
- Module 1: Introduction to LLM - 10 Learning Units
- Module 2: Basics of Prompting - 12 Learning Units
- Module 3: Deep Dive into LLM Integration - 15 Learning Units
- Module 4: Advanced LLM Concepts - 17 Learning Units

Pricing:
- Module 1 and 2: Free
- Module 3 and 4: Rs. 499

Enrollment:
- Interested learners should be guided to enrollment using the payment link below.
- Payment link: https://ai-academy.example.com/pricing

Certificate:
- A certificate can be issued after successful course completion.

Response rules:
- Answer only from the provided course context.
- If the question is outside scope, reply with: I don't know.
`;

const WELCOME_MESSAGE = "Thank you for reaching out to the AI Academy! How can I help you today?";
const EMPTY_MESSAGE_REPLY = "Please send your question again.";
const FALLBACK_MESSAGE = "Sorry, I am facing some issues. Please try again later.";
const OUT_OF_SCOPE_MESSAGE = "I don't know.";
const REPLY_DELAY_MS = 1200;
const DUPLICATE_WINDOW_MS = 15000;

const PREDEFINED_RESPONSES = {
	pricing: "AI Academy pricing: Module 1 and 2 are free, and Module 3 and 4 cost Rs. 499. Payment link: https://ai-academy.example.com/pricing",
	enrollment: "To enroll, please review the pricing and complete payment here: https://ai-academy.example.com/pricing",
	structure: "The course has 4 modules: Introduction to LLM, Basics of Prompting, Deep Dive into LLM Integration, and Advanced LLM Concepts.",
	certificate: "A certificate is available after successful course completion.",
};

module.exports = {
	COURSE_CONTEXT,
	WELCOME_MESSAGE,
	EMPTY_MESSAGE_REPLY,
	FALLBACK_MESSAGE,
	OUT_OF_SCOPE_MESSAGE,
	REPLY_DELAY_MS,
	DUPLICATE_WINDOW_MS,
	PREDEFINED_RESPONSES,
};
