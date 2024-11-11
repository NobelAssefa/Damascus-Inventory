import { Box } from "@mui/material";
import GeoMap from "../../../components/Geomap";
import Header from "../../../components/Header";
import {useTheme} from "@mui/material";
import { tokens } from "../../../theme";
const Geomap = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <Box m="20px">
            <Header title="Geography" subtitle="Simple Geography Chart" />
            <Box height="75vh"
                border={`1px solid ${colors.grey[100]}`}
                borderRadius="4px">
                <GeoMap />
            </Box>
        </Box>
    )
}

export default Geomap;