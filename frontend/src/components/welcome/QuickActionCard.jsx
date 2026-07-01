import "../../styles/welcome/QuickActionCard.css";

function QuickActionCard({ icon, title, question, setQuestion }) {
  return (
    <button
      className="quick-action-card"
      onClick={() => setQuestion(question)}
    >
      <div className="quick-action-icon">{icon}</div>

      <div className="quick-action-title">
        {title}
      </div>
    </button>
  );
}

export default QuickActionCard;