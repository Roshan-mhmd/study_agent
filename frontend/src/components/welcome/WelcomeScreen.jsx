import "../../styles/welcome/WelcomeScreen.css";
import QuickActionCard from "./QuickActionCard";

function WelcomeScreen({ setQuestion }) {

    const actions = [

        {
            icon: "🎓",
            title: "Admissions",
            question: "What is the admission procedure?"
        },

        {
            icon: "💰",
            title: "Fee Structure",
            question: "What is the fee structure?"
        },

        {
            icon: "🏠",
            title: "Hostel",
            question: "Tell me about hostel facilities."
        },

        {
            icon: "📈",
            title: "Placements",
            question: "Tell me about placements."
        },

        {
            icon: "📚",
            title: "Departments",
            question: "List all departments."
        },

        {
            icon: "📅",
            title: "Academic Calendar",
            question: "What is the academic calendar?"
        }

    ];

    return (

        <div className="welcome-screen">

            <h2 className="welcome-heading">

Quick Actions

</h2>

            <div className="quick-actions">

                {actions.map((action, index) => (

                    <QuickActionCard

                        key={index}

                        icon={action.icon}

                        title={action.title}

                        question={action.question}

                        setQuestion={setQuestion}

                    />

                ))}

            </div>

        </div>

    );

}

export default WelcomeScreen;