import "../../styles/chat/SourceCard.css";

function SourceCard({ source }) {
  const isWebsite =
    source?.url &&
    source.url.startsWith("http");

  return (
    <div className="source-card">

      <div className="source-icon">
        {isWebsite ? "🌐" : "📄"}
      </div>

      <div className="source-details">

        <div className="source-name">
          {source.name || "Unknown Source"}
        </div>

        <div className="source-type">
          {isWebsite
            ? "Website Source"
            : "Knowledge Base Document"}
        </div>

      </div>

      {source.url && (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="source-link"
        >
          Open →
        </a>
      )}

    </div>
  );
}

export default SourceCard;