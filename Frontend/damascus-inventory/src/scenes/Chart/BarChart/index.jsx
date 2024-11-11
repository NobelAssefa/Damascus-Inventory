import { Box } from "@mui/material";
import Header from "../../../components/Header";
import BarChart from "../../../components/Barchart";


const Barchart = ()=>{
    return(
        <Box m="20px">
            <Header title="Barchart" subtitle="Checkout Your data using barchart"/>
            <Box height="75vh">
                <BarChart/>
            </Box>

        </Box>
    )
}

export default Barchart;