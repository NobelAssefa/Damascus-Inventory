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
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
};
const PhoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup.string().matches(PhoneRegExp, "Invalid Contact address").required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),

})

const AddProduct = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme()
    const colors = tokens(theme.palette.mode) 
    const navigate = useNavigate();
    const handelFormSubmit = (value) => {
        console.log(value);
        navigate("/users")


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
                    <ArrowBackIcon textDecoration = "none" fontSize="medium" />
                </Box>
                </Link>
                

            </Box>
            <Box mt="20px">
            <Header  title="Create product" subtitle="creating new product" />
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
                                fullwidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }}

                            />
                            <TextField
                                fullwidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={!!touched && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2" }}

                            />
                            <TextField
                                fullwidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2" }}

                            />
                            <TextField
                                fullwidth
                                variant="filled"
                                type="text"
                                label="Contact"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.contact}
                                name="contact"
                                error={!!touched && !!errors.contact}
                                helperText={touched.contact && errors.contact}
                                sx={{ gridColumn: "span 2" }}

                            />
                            <TextField
                                fullwidth
                                variant="filled"
                                type="text"
                                label="Address 1"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address1}
                                name="address1"
                                error={!!touched && !!errors.address1}
                                helperText={touched.address1 && errors.address1}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullwidth
                                variant="filled"
                                type="text"
                                label="Address 2"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address2}
                                name="address2"
                                error={!!touched && !!errors.address2}
                                helperText={touched.address2 && errors.address2}
                                sx={{ gridColumn: "span 4" }}

                            />



                        </Box>

                        <Box display="flex" justifyContent="end" mt="10px">

                            <Button style={{color:"inherit"}} type="submit" variant="contained" color="secondary" > Create Product</Button>
                        </Box>

                    </form>
                )
                }

            </Formik>

        </Box>
    )
}

export default AddProduct;