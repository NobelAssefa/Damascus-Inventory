import React from "react";
import {  Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const LodingSpiner = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"

        >
         
            <CircularProgress color="secondary"/>

        </Box>
    )

}

export default LodingSpiner;