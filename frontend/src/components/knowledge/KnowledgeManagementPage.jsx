import { useState, useEffect } from "react";

import {
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";

import api from "../../services/api";

import StatisticsCards from "./StatisticsCards";
import QuickActions from "./QuickActions";
import DocumentsTable from "./DocumentsTable";

function KnowledgeManagementPage() {

  const [documents, setDocuments] = useState([]);

  const [stats, setStats] = useState({
    documents: 0,
    chunks: 0,
    website_chunks: 0,
    manual_chunks: 0,
    embedding_model: "all-MiniLM-L6-v2",
  });

  const [loading, setLoading] = useState(true);

  //------------------------------------
  // Load Documents
  //------------------------------------

  const loadDocuments = async () => {

    try {

      const response = await api.get("/documents");

      setDocuments(response.data);

    } catch (error) {

      console.error(
        "Failed to load documents:",
        error
      );

    }

  };

  //------------------------------------
  // Load Statistics
  //------------------------------------

  const loadStatistics = async () => {

    try {

      const response = await api.get("/stats");

      setStats(response.data);

    } catch (error) {

      console.error(
        "Failed to load statistics:",
        error
      );

    }

  };

  //------------------------------------
  // Initial Load
  //------------------------------------

  useEffect(() => {

    const initialize = async () => {

      setLoading(true);

      await Promise.all([
        loadDocuments(),
        loadStatistics(),
      ]);

      setLoading(false);

    };

    initialize();

  }, []);

  //------------------------------------
  // UI
  //------------------------------------

  return (

    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >

      <Typography
        variant="h4"
        fontWeight="bold"
      >

        📚 Campus Knowledge Management

      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: 4,
        }}
      >

        Manage all knowledge sources powering your Campus AI Assistant.

      </Typography>

      {/* Statistics */}

      <StatisticsCards
        stats={stats}
      />

      {/* Quick Actions */}

      <Box
        sx={{
          mt: 4,
          mb: 4,
        }}
      >

        <QuickActions />

      </Box>

      {/* Knowledge Library */}

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >

          📚 Knowledge Library

        </Typography>

        <DocumentsTable

          documents={documents}

          loading={loading}

          loadDocuments={loadDocuments}

        />

      </Paper>

    </Container>

  );

}

export default KnowledgeManagementPage;