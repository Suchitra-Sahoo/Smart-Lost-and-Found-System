import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-10 right-8 flex items-center gap-4 bg-black border-2 border-orange-500 text-orange-400 px-6 py-4 rounded-full shadow-[0_0_15px_#f97316] hover:shadow-[0_0_25px_#f97316] transition-all cursor-pointer"
        >
          <FaComments size={28} />
          <span className="font-bold text-lg">AI Support</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-8 w-96 h-[28rem] bg-zinc-900 rounded-xl shadow-xl border border-orange-500 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-black border-b border-orange-500 p-4 flex justify-between items-center">
            <h3 className="text-orange-400 font-semibold text-lg">Chat with us</h3>
            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
              <FaTimes className="text-orange-400" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto text-white">
            <p className="text-gray-400 text-sm">
              Welcome! How can we help you today?
            </p>
            <div className="mt-2 bg-orange-500/20 text-orange-400 p-2 rounded-lg inline-block max-w-[80%]">
              Hi! Need help?
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-orange-500 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="bg-orange-500 text-black px-5 py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer text-sm sm:text-base font-semibold">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
