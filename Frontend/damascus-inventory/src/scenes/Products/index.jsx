import { Typography, Box, useTheme, Toolbar } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { mockDataInvoices } from "../../Data/mockData";
const Products = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "cost", headerName: "Cost", type: "number", headerAlign: "left", align: "left" },
        { field: "date", headerName: "Date", flex: 1 },
        {
            field: "status", headerName: "Status", flex: 1, headerAlign: "center", align: "left",
            renderCell: ({ row: { status } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"

                        backgroundColor={
                            status === "available"
                                ? colors.greenAccent[700]
                                : status === "outOfStock"
                                    ? colors.redAccent[700]
                                    : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {status === "available" && <Inventory2OutlinedIcon />}

                        {status === "outOfStock" && <RemoveShoppingCartOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{
                            ml: "5px"
                        }}>
                            {status}
                        </Typography>
                    </Box>
                )

            }
        },

    ]
    return (
        <Box m="20px">
            <Header title="Products" subtitle="Manage products" />


            <Box
                display="flex"
                justifyContent="end"
                mt="10px"
                p="5px"
            >
                <Link
                    to="/createProduct"
                    style={{ textDecoration: 'none' }}
                >
                    <Box
                        position="relative"
                        width="150px"
                        display="flex"
                        justifyContent="center"
                        p="5px"
                        backgroundColor={colors.greenAccent[500]}
                        borderRadius="4px"
                    >
                        <Typography fontSize = "large" color={colors.primary[500]}>Create Product</Typography>
                        
                    </Box>
                </Link>
            </Box>

            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blue[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: colors.blue[700],
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blue[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: colors.grey[100], // Text and icon color for buttons
                    },

                }}

            >
                <DataGrid checkboxselection rows={mockDataInvoices} columns={columns} slots={{ toolbar: GridToolbar }} />


                

            </Box>
        </Box>
    )
}

export default Products;