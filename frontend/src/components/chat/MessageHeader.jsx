function MessageHeader({ isUser }) {
  return (
    <div
      className="message-header"
    >
      {isUser ? "👤 You" : "🤖 Campus AI"}
    </div>
  );
}

export default MessageHeader;