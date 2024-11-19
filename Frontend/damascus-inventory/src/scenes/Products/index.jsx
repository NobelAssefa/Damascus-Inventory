import { useEffect, useState } from 'react';

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
import { getAllProducts } from '../../config/apiCalls/productApiCall';
const Products = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await getAllProducts();
                setProducts(productData);
                console.log("Product Data..." + productData);

            } catch (err) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);


    console.log(products);

    const columns = [
        { field: '_id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Name', flex: 1, cellClassName: 'name-column--cell' },
        { field: 'category', headerName: 'Category', flex: 1 },
        { field: 'price', headerName: 'Price', type: 'number', flex: 1, headerAlign: 'left', align: 'left' },
        { field: 'sku', headerName: 'SKU', flex: 1 },
        {
            field: 'stock',
            headerName: 'Stock',
            flex: 1,
            renderCell: ({ row: { stock } }) => {
                const status = stock > 0 ? 'available' : 'outOfStock';
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            status === 'available'
                                ? colors.greenAccent[700]
                                : colors.redAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {status === 'available' && <Inventory2OutlinedIcon />}
                        {status === 'outOfStock' && <RemoveShoppingCartOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                            {status}
                        </Typography>
                    </Box>
                );
            },
        },
       
    ];



    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
                        <Typography fontSize="large" color={colors.primary[500]}>Create Product</Typography>

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
                <DataGrid
                    checkboxselection
                    rows={products}
                    getRowId={(row) => row._id}
                    columns={columns}
                    slots={{ toolbar: GridToolbar }} />




            </Box>
        </Box>
    )
}

export default Products;