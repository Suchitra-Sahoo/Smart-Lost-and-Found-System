import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import { faqData } from "./faqData";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: input }]);

    const reply = getBotResponse(input);
    setMessages(prev => [...prev, { sender: "bot", text: reply }]);

    setInput("");
  };

  const getBotResponse = (query) => {
    const text = query.toLowerCase().trim();

    // Greetings
    if (["hi", "hello", "hey"].some(word => text.includes(word))) {
      return "Hello 👋 How can I assist you?";
    }

    // Thanks
    if (["thanks", "thank you", "thx"].some(word => text.includes(word))) {
      return "You're welcome 😊 Happy to help!";
    }

    // Bye
    if (["bye", "goodbye", "see you"].some(word => text.includes(word))) {
      return "Goodbye 👋 Have a great day!";
    }

    // OK
    if (["ok", "okay", "alright", "fine"].includes(text)) {
      return "👍 Let me know if you need any more help.";
    }

    // FAQ matching
    for (const faq of faqData) {
      if (faq.keywords.some(keyword => text.includes(keyword))) {
        return faq.answer;
      }
    }

    // Default fallback
    return "I'm not sure about that. Please use the Contact page and our admin will help you.";
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3
          bg-black border-2 border-orange-500 text-orange-400 px-5 py-3
          rounded-full shadow-[0_0_15px_#f97316] hover:shadow-[0_0_25px_#f97316]"
        >
          <FaComments size={22} />
          <span className="font-semibold">AI Support</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[92%] max-w-sm h-[65vh]
          bg-zinc-900 border border-orange-500 rounded-xl flex flex-col z-50">

          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-black border-b border-orange-500 rounded-t-xl">
            <h3 className="text-orange-400 font-semibold">CampusFind Support</h3>
            <FaTimes
              className="text-orange-400 cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                setMessages([
                  { sender: "bot", text: "Hello 👋 How can I help you today?" }
                ]);
              }}
            />
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 text-white">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] text-sm ${
                  msg.sender === "bot"
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-blue-500/20 text-blue-300 ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-orange-500 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-zinc-800 text-white rounded-lg px-3 py-2
              focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-orange-500 px-4 py-2 rounded-lg text-black font-semibold hover:bg-orange-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
