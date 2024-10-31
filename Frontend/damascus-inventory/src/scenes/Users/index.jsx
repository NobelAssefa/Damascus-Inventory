import { Typography, Box, useTheme, Toolbar, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { mockDataTeam } from "../../Data/mockData";
const Users = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        {
            field: "accessLevel", headerName: "Access Level", flex: 1,
            renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"

                        backgroundColor={
                            access === "admin"
                                ? colors.greenAccent[700]
                                : access === "user"
                                    ? colors.greenAccent[700]
                                    : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {access === "admin" && <AdminPanelSettingsOutlinedIcon />}

                        {access === "user" && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{
                            ml: "5px"
                        }}>
                            {access}
                        </Typography>
                    </Box>
                )

            }
        },

    ]
    return (
        <Box m="20px" sx={{ overflow: "hidden" }}>

            <Header title="Users" subtitle="Manage users" />

            <Box
                display="flex"
                justifyContent="end"
                mt="10px"
                p="5px"
            >
                <Link
                    to="/createUser"
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
                        <Typography fontSize="large" color={colors.primary[500]}>Create User</Typography>
                        
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
                <DataGrid checkboxselection rows={mockDataTeam} columns={columns} slots={{ toolbar: GridToolbar }} />


            </Box>
        </Box>
    )
}

export default Users;