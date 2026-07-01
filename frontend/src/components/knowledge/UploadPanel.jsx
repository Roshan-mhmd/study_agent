import {

Card,

CardContent,

Typography,

Button,

Stack

} from "@mui/material";

function UploadPanel({

file,

setFile,

uploadFile

}){

return(

<Card>

<CardContent>

<Stack
spacing={3}
>

<Typography
variant="h6"
>

📤 Upload PDF

</Typography>

<Button

variant="outlined"

component="label"

>

Choose File

<input

hidden

type="file"

accept=".pdf"

onChange={(e)=>setFile(e.target.files[0])}

/>

</Button>

{

file&&

<Typography>

{file.name}

</Typography>

}

<Button

variant="contained"

onClick={uploadFile}

disabled={!file}

>

Upload Knowledge

</Button>

</Stack>

</CardContent>

</Card>

);

}

export default UploadPanel;