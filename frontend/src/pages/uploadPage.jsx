import { useEffect, useState } from "react";
import api from "../services/api";
import UploadHeader from "../components/upload/UploadHeader";
import UploadCard from "../components/upload/UploadCard";
import KnowledgeHeader from "../components/knowledge/Header";
import QuickActions from "../components/knowledge/QuickActions";
import OverviewCards from "../components/knowledge/OverviewCards";
import DocumentsTable from "../components/knowledge/DocumentsTable";
function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [documents, setDocuments] = useState([]);

  const loadDocuments = async () => {
    try {
      const response =
        await api.get("/documents");

      setDocuments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response =
        await api.post(
          "/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setMessage(
        response.data.message
      );

      loadDocuments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
style={{
padding:"35px",
background:"#F8FAFC",
minHeight:"100vh"
}}
>

<KnowledgeHeader/>

<QuickActions/>

<OverviewCards

documents={documents}

/>

<DocumentsTable

    documents={documents}

    onDelete={(doc)=>{

        setSelectedFile(doc);

        setDeleteOpen(true);

    }}

    onRefresh={(doc)=>{

        console.log(doc);

    }}

/>
<p
style={{
marginTop:"20px",
color:"#16A34A",
fontWeight:"600"
}}
>

{message}

</p>

</div>
  );
}

export default UploadPage;