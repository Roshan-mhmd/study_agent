import "../../styles/chat/ThinkingIndicator.css";

function ThinkingIndicator() {
  return (
    <div className="thinking-row">

      <div className="thinking-card">

        <div className="thinking-header">
          🤖 Campus AI
        </div>

        <div className="thinking-text">
          Searching Campus Knowledge...
        </div>

        <div className="thinking-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

    </div>
  );
}

export default ThinkingIndicator;