import { Box } from "@mui/material";
import Header from "../../../components/Header";
import PieChart from "../../../components/Piechart";

const Piechart = () => {
    return (
        <Box m="20px">
            <Header title="Pie Chart" subtitle="Checkout Your data using piechart" />
            <Box height="75vh">
                <PieChart/>
            </Box>
        

        </Box>
    )

}

export default Piechart;