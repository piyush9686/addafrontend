import Chatbot from "../components/Chatbot";
import Navbar from "../components/Navbar";

const ChatPage = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">AI Assistant</h1>
        <Chatbot />
      </div>
    </div>
  );
};

export default ChatPage;