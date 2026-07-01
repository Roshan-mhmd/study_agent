import { useState } from "react";
import Toast from "../common/Toast";
function MessageActions({ text }) {

    const [showToast, setShowToast] = useState(false);
    const copyAnswer = async () => {

    await navigator.clipboard.writeText(text);

    setShowToast(true);

    setTimeout(() => {

        setShowToast(false);

    },1500);

};
    return (

        <div className="message-actions">

            <button
            onClick={copyAnswer}
            >
                📋 Copy
            </button>

            <button>

                👍

            </button>

            <button>

                👎

            </button>
            <>
    {/* existing buttons */}

    <Toast

        show={showToast}

        message="Copied to clipboard"

    />
</>

        </div>

    );

}

export default MessageActions;