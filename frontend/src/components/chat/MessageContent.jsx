import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MessageContent({ text }) {

    return (

        <div className="message-content">

            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
            >
                {text}
            </ReactMarkdown>

        </div>

    );

}

export default MessageContent;