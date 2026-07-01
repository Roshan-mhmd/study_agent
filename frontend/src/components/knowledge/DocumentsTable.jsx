import { useMemo, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import api from "../../services/api";

import DeleteDialog from "../common/DeleteDialog";
import SuccessSnackbar from "../common/SuccessSnackbar";

import DocumentViewer from "./dialogs/DocumentViewer";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LanguageIcon from "@mui/icons-material/Language";
import EditNoteIcon from "@mui/icons-material/EditNote";

import VisibilityIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";

function DocumentsTable({
  documents = [],
  loading = false,
  onDelete,
  onRefresh,
}) {
  const [search, setSearch] = useState("");

  const [filterType, setFilterType] = useState("all");
const [selectedDocument, setSelectedDocument] = useState(null);

const [deleteOpen, setDeleteOpen] = useState(false);

const [viewerOpen, setViewerOpen] = useState(false);

const [snackbarOpen, setSnackbarOpen] = useState(false);

const [message, setMessage] = useState("");
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        filterType === "all"
          ? true
          : doc.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [documents, search, filterType]);

  const rows = filteredDocuments.map((doc, index) => ({
    id: index,
    ...doc,
  }));
  const deleteDocument = async () => {

    if (!selectedDocument) return;

    try {

        const response = await api.delete(

            `/documents/${selectedDocument.name}`

        );

        setMessage(response.data.message);

        setSnackbarOpen(true);

        setDeleteOpen(false);

        onRefresh?.();

    }

    catch(error){

        console.error(error);

    }

};
const refreshDocument = async (doc)=>{

    try{

        await api.post(

            `/documents/${doc.name}/refresh`

        );

        setMessage("Document refreshed.");

        setSnackbarOpen(true);

        onRefresh?.();

    }

    catch(error){

        console.error(error);

    }

}
  const columns = [
    {
      field: "name",
      headerName: "Knowledge",
      flex: 2,
    },

    {
      field: "type",
      headerName: "Type",
      width: 160,

      renderCell: (params) => {
        switch (params.value) {
          case "pdf":
            return (
              <Chip
                icon={<PictureAsPdfIcon />}
                label="PDF"
                color="error"
                size="small"
              />
            );

          case "website":
            return (
              <Chip
                icon={<LanguageIcon />}
                label="Website"
                color="primary"
                size="small"
              />
            );

          default:
            return (
              <Chip
                icon={<EditNoteIcon />}
                label="Manual"
                color="success"
                size="small"
              />
            );
        }
      },
    },

    {
      field: "chunks",
      headerName: "Chunks",
      width: 120,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      sortable: false,

      renderCell:(params)=>(

<>

<IconButton

onClick={()=>{

setSelectedDocument(params.row);

setViewerOpen(true);

}}

>

<VisibilityIcon/>

</IconButton>

<IconButton

color="primary"

onClick={()=>refreshDocument(params.row)}

>

<RefreshIcon/>

</IconButton>

<IconButton

color="error"

onClick={()=>{

setSelectedDocument(params.row);

setDeleteOpen(true);

}}

>

<DeleteIcon/>

</IconButton>

</>

),
    },
  ];

  return (
    <Box>

      <Stack
        direction="row"
        spacing={2}
        mb={3}
      >

        <TextField
          fullWidth
          label="Search Knowledge"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <FormControl sx={{ minWidth: 180 }}>

          <InputLabel>

            Type

          </InputLabel>

          <Select
            value={filterType}
            label="Type"
            onChange={(e) =>
              setFilterType(e.target.value)
            }
          >

            <MenuItem value="all">

              All

            </MenuItem>

            <MenuItem value="pdf">

              PDF

            </MenuItem>

            <MenuItem value="website">

              Website

            </MenuItem>

            <MenuItem value="manual">

              Manual

            </MenuItem>

          </Select>

        </FormControl>

      </Stack>

      <Box
        sx={{
          height: 550,
          width: "100%",
        }}
      >

        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
        />
  <DocumentViewer

open={viewerOpen}

document={selectedDocument}

onClose={()=>setViewerOpen(false)}

/>

<DeleteDialog

open={deleteOpen}

filename={selectedDocument?.name}

onClose={()=>setDeleteOpen(false)}

onConfirm={deleteDocument}

/>

<SuccessSnackbar

open={snackbarOpen}

message={message}

onClose={()=>setSnackbarOpen(false)}

/>
      </Box>

    </Box>
  );
}

export default DocumentsTable;