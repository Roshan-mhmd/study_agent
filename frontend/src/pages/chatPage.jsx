import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import ThinkingIndicator from "../components/chat/ThinkingIndicator";
import WelcomeScreen from "../components/welcome/WelcomeScreen";
import MessageBubble from "../components/chat/MessageBubble";
import "../styles/chat/ChatPage.css";
function ChatPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const askQuestion = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const response = await api.post("/ask", {
        question,
        history: messages.slice(-6)
          .map((m) => ({
            role: m.role,
            text:
              m.text ||
              m.answers?.map((a) => a.answer).join("\n"),
          })),
      });
        console.log(response.data);
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          text: question,
        },
        {
          role: "assistant",
          answers: response.data.answers || [],
          metadata: response.data.metadata
        },
      ]);

      setQuestion("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
    
      {/* Messages Area */}
     <div
      ref={chatContainerRef}
      className="chat-container"
    >
     {messages.length === 0 && (
    <WelcomeScreen
        setQuestion={setQuestion}
    />
)}

<div> 
    {messages.length > 0 &&
  messages.map((message, index) => (
    <MessageBubble
      key={index}
      message={message}
    />
    
))}
</div>
     
    </div>
  
     {loading && <ThinkingIndicator />}

     {/* Input Area */}
<div className="chat-input-wrapper">
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askQuestion();
              }
            }}
            placeholder="Ask anything about your college..."
      
            style={{

                    flex:1,

                    padding:"16px",

                    borderRadius:"30px",

                    border:"1px solid #CBD5E1",

                    outline:"none",

                    fontSize:"15px",

                  background:"#FFFFFF",

        }}

          />

          <button
            onClick={askQuestion}
            disabled={loading}
           style={{
    padding: "15px 28px",
    borderRadius: "30px",
    border: "none",
    background:"#2563EB",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;