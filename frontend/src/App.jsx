import { useState } from "react";

import ChatPage from "./pages/ChatPage";
import KnowledgeManagementPage from "./components/knowledge/KnowledgeManagementPage";

import Layout from "./components/Layout";

function App() {
  const [currentPage, setCurrentPage] =
    useState("chat");

  return (
    <Layout
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      {currentPage === "chat" ? (
        <ChatPage />
      ) : (
        <KnowledgeManagementPage />
      )}
    </Layout>
  );
}

export default App;