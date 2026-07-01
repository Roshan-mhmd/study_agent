import {
  DataGrid
} from "@mui/x-data-grid";

import {
  Box,
  Chip,
  IconButton
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LanguageIcon from "@mui/icons-material/Language";
import EditNoteIcon from "@mui/icons-material/EditNote";

import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";

function DocumentsTable({
    documents = [],
    onDelete,
    onRefresh
}) {

  const columns = [

    {
      field: "name",
      headerName: "Knowledge",
      flex: 2
    },

    {
      field: "type",
      headerName: "Type",
      flex: 1,

      renderCell: (params) => {

        const type = params.value;

        if (type === "pdf")
          return (
            <Chip
              icon={<PictureAsPdfIcon />}
              label="PDF"
              color="error"
              size="small"
            />
          );

        if (type === "website")
          return (
            <Chip
              icon={<LanguageIcon />}
              label="Website"
              color="primary"
              size="small"
            />
          );

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

    {
      field: "chunks",
      headerName: "Chunks",
      width: 120
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 170,

      sortable: false,

      renderCell: (params) => (

        <>

          <IconButton>

            <VisibilityIcon />

          </IconButton>

          <IconButton
            color="primary"
            onClick={() =>
              onRefresh(params.row)
            }
          >

            <RefreshIcon />

          </IconButton>

          <IconButton
            color="error"
            onClick={() =>
              onDelete(params.row)
            }
          >

            <DeleteIcon />

          </IconButton>

        </>

      )

    }

  ];

  const rows = documents.map(
    (doc, index) => ({

      id: index,

      ...doc

    })
  );

  return (

    <Box
      sx={{
        height: 550,
        width: "100%"
      }}
    >

      <DataGrid

        rows={rows}

        columns={columns}

        pageSizeOptions={[5,10,20]}

        initialState={{

          pagination: {

            paginationModel: {

              pageSize: 10

            }

          }

        }}

      />

    </Box>

  );

}

export default DocumentsTable; 