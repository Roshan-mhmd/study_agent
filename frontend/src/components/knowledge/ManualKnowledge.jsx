import api from "../../services/api";
import { useState } from "react";

import {

Card,

CardContent,

Typography,

TextField,

Button,

Stack,

Alert

} from "@mui/material";

import EditNoteIcon from "@mui/icons-material/EditNote";

function ManualKnowledge(){

const [title,setTitle]=useState("");

const [content,setContent]=useState("");


const saveKnowledge = async () => {

    try {

        await api.post("/manual-note", {

            title,

            content

        });

        alert("Knowledge saved successfully.");

        setTitle("");

        setContent("");

    }

    catch (err) {

        console.error(err);

        alert("Failed to save knowledge.");

    }

};

return(

<Card elevation={3}>

<CardContent>

<Stack spacing={3}>

<Stack
direction="row"
spacing={1}
alignItems="center"
>

<EditNoteIcon color="primary"/>

<Typography variant="h6">

Manual Knowledge

</Typography>

</Stack>

<Typography color="text.secondary">

Store announcements or important
information directly into the
knowledge base.

</Typography>

<TextField

label="Title"

fullWidth

value={title}

onChange={(e)=>setTitle(e.target.value)}

/>

<TextField

label="Knowledge"

multiline

rows={5}

fullWidth

value={content}

onChange={(e)=>setContent(e.target.value)}

/>

<Button

variant="contained"

disabled={!title||!content}

onClick={saveKnowledge}

>

Save Knowledge

</Button>

<Alert severity="info">

Manual Knowledge backend will
be implemented later.

</Alert>

</Stack>

</CardContent>

</Card>

);

}

export default ManualKnowledge;