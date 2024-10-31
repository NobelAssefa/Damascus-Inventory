import { Box } from "@mui/material";
import Header from "../../components/Header";
const Dashboard = () => {
    return <div>
        <Box m="20px" display= "flex" justifyContent="space-between" alignItems="center">
            <Header title="Dashboard" subtitle="Welecom To Your Dashboard" />
        </Box>
    </div>
}

export default Dashboard;