import "../../styles/upload/UploadCard.css";

function UploadCard({
    file,
    setFile,
    uploadFile
}) {

    return (

        <div className="upload-card">

            <div className="upload-icon">

                📄

            </div>

            <h2>

                Upload PDF

            </h2>

            <p>

                Upload PDF documents to expand the Campus AI knowledge base.

            </p>

            <input

                type="file"

                accept=".pdf"

                onChange={(e)=>setFile(e.target.files[0])}

            />

            {file && (

                <div className="selected-file">

                    {file.name}

                </div>

            )}

            <button

                onClick={uploadFile}

            >

                Upload Knowledge

            </button>

        </div>

    );

}

export default UploadCard;