import {

Grid,

Paper,

Typography,

Stack

} from "@mui/material";

function OverviewCards({

documents

}){

const cards=[

{

title:"Documents",

value:documents.length,

icon:"📚"

},

{

title:"Chunks",

value:"--",

icon:"🧩"

},

{

title:"Websites",

value:"--",

icon:"🌐"

},

{

title:"Embedding",

value:"MiniLM",

icon:"🤖"

}

];

return(

<Grid
container
spacing={3}
mb={4}
>

{

cards.map((card,index)=>(

<Grid
size={{
xs:12,
sm:6,
md:3
}}
key={index}
>

<Paper
elevation={2}
sx={{
p:3
}}
>

<Stack
spacing={1}
alignItems="center"
>

<Typography
variant="h3"
>

{card.icon}

</Typography>

<Typography
variant="h5"
fontWeight="bold"
>

{card.value}

</Typography>

<Typography>

{card.title}

</Typography>

</Stack>

</Paper>

</Grid>

))

}

</Grid>

);

}

export default OverviewCards;