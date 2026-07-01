import SourceCard from "./SourceCard";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";
import MessageActions from "./MessageActions";
import "../../styles/chat/MessageBubble.css";
import ResponseFooter from "./ResponseFooter";
function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
className={`message-row ${isUser ? "user" : "assistant"}`}
>
     <div
className={`message-card ${isUser ? "user" : "assistant"}`}
>
        {/* USER MESSAGE */}

        {isUser && (
          <>
            <MessageHeader isUser />
            <MessageContent text={message.text} />
          </>
        )}

        {/* ASSISTANT */}

        {!isUser &&
          message.answers?.map((block, index) => (
            <div key={index}>
              <MessageHeader
    isUser={false}
/>

{message.answers.length > 1 && (
    <h3 className="message-question">
        {block.question}
    </h3>
)}

<MessageContent
    text={block.answer}
/>
              

              {block.sources?.length > 0 && (
                <>
                  <strong
                    style={{
                      display: "block",
                      marginTop: "18px",
                      marginBottom: "8px",
                    }}
                  >
                    Sources
                  </strong>

                  {block.sources.map((source, i) => (
                    <SourceCard
                      key={i}
                      source={source}
                    />
                  ))}
                </>
              )}
              <ResponseFooter
    metadata={message.metadata}
    sourceCount={block.sources.length}
/>
          <MessageActions
    text={block.answer}
/>
              {index !==
                message.answers.length - 1 && (
                <hr
                  style={{
                    marginTop: "18px",
                    marginBottom: "18px",
                    border:
                      "1px solid #E5E7EB",
                  }}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default MessageBubble;