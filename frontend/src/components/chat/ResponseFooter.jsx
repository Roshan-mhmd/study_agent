import "../../styles/chat/ResponseFooter.css";

const strategyMap = {
  knowledge_base: {
    icon: "🧠",
    label: "Campus Knowledge Base",
  },

  knowledge_base_then_website: {
    icon: "🧠",
    label: "Campus Knowledge Base",
  },

  website: {
    icon: "🌐",
    label: "Official Website",
  },

  website_then_general: {
    icon: "🌐",
    label: "Official Website",
  },

  general: {
    icon: "🤖",
    label: "General AI",
  },
};

function ResponseFooter({ metadata, sourceCount }) {

  if (!metadata) return null;

  const strategy =
    strategyMap[metadata.strategy] || {
      icon: "🤖",
      label: "AI Assistant",
    };

  return (
    <div className="response-footer">

      <div className="footer-item">
        {strategy.icon}
        <span>{strategy.label}</span>
      </div>

      <div className="footer-item">
        ⚡ {metadata.processing_time}s
      </div>

      <div className="footer-item">
        📚 {sourceCount} Source{sourceCount !== 1 ? "s" : ""}
      </div>

    </div>
  );
}

export default ResponseFooter;