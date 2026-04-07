import { useState, useRef, useEffect } from "react";
import api from "../services/api.js";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // ✅ auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setChat((prev) => [
      ...prev,
      { type: "user", text: userMessage }
    ]);

    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/ai/chat", { message: userMessage });

      setChat((prev) => [
        ...prev,
        { type: "bot", text: res.data.reply }
      ]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { type: "bot", text: "Something went wrong ❌" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔥 FLOATING BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        💬
      </button>

      {/* 💬 CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-20 right-5 w-80 h-[420px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden">

          {/* HEADER */}
          <div className="bg-blue-600 text-white p-3 font-semibold">
            AI Assistant 🤖
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-100">

            {chat.map((c, i) => (
              <div
                key={i}
                className={`flex ${
                  c.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                    c.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 shadow"
                  }`}
                >
                  {c.text}
                </div>
              </div>
            ))}

            {/* 🔄 Loading */}
            {loading && (
              <div className="text-sm text-gray-500">Typing...</div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* INPUT AREA */}
          <div className="p-2 border-t flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;