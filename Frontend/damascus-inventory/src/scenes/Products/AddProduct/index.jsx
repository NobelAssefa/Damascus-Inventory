import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik"
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { tokens } from "../../../theme";
import { useState } from "react";
import { createProducts } from '../../../config/apiCalls/productApiCall'
const initialValues = {
    name: "",
    stock: "",
    sku: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
    image: "",
};
const PhoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required"),
    stock: yup.number().required("Required"),
    category: yup.string().required("Required"),
    quantity: yup.number().required("Required"),
    price: yup.number().required("Required"),
    description: yup.string().required("Required"),
  

})

const AddProduct = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
   
    const handelFormSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const response = await createProducts(values);
            if (response) {
                alert("Added successfully!")
                resetForm();
                navigate('/products')
            }


        } catch (errors) {
            throw new Error('unable to create a new product')

        } finally {
            setLoading(false)
        }
    }

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Link
                    to="/products"
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <Box display="flex"
                        justifyContent="center"
                        p="5px"
                        backgroundColor={colors.greenAccent[500]}
                        borderRadius="4px">
                        <ArrowBackIcon textDecoration="none" fontSize="medium" />
                    </Box>
                </Link>


            </Box>
            <Box mt="20px">
                <Header title="Create product" subtitle="creating new product" />
            </Box>
            <Formik
                onSubmit={handelFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}

            >
                {({ values, errors, touched, handleSubmit, handleBlur, handleChange }) =>
                (
                    <form
                        onSubmit={handleSubmit}
                    >
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0,1fr))"
                            sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}

                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}

                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Stock"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.stock}
                                name="stock"
                                error={!!touched && !!errors.stock}
                                helperText={touched.stock && errors.stock}
                                sx={{ gridColumn: "span 2" }}

                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Category"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.category}
                                name="category"
                                error={!!touched && !!errors.category}
                                helperText={touched.category && errors.category}
                                sx={{ gridColumn: "span 2" }}

                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Quantity"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.quantity}
                                name="quantity"
                                error={!!touched && !!errors.quantity}
                                helperText={touched.quantity && errors.quantity}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Price"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.price}
                                name="price"
                                error={!!touched && !!errors.price}
                                helperText={touched.price && errors.price}
                                sx={{ gridColumn: "span 4" }}

                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                                error={!!touched && !!errors.description}
                                helperText={touched.description && errors.description}
                                sx={{ gridColumn: "span 4" }}

                            />





                        </Box>

                        <Box display="flex" justifyContent="end" mt="10px">
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                disabled={loading}
                            >
                                {loading ? "Adding..." : "Create Product"}
                            </Button>
                        </Box>

                    </form>
                )
                }

            </Formik>

        </Box>
    )
}

export default AddProduct;