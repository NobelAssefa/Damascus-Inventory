import { Box, Button, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useTheme } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

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
});

const AddUser = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const handelFormSubmit = (values) => {
        console.log(values);
        // Assuming user registration is successful, redirect to login page
        navigate("/login");
    };

    return (

        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            padding="20px"
        >
            <Paper
                elevation={3} // Set elevation to create shadow
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    p: 3,
                    bgcolor: colors.greenAccent[700], // Inherit background color
                    boxShadow: 3, // Adjust shadow
                    borderRadius: 2, // Rounded corners
                }}
            >

                <Box width={isNonMobile ? "100%" : "100%"}>
                    <Box mt="10px">
                        <Header title="Register User" subtitle="Registering new user" />
                    </Box>
                    <Formik
                        onSubmit={handelFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                    >
                        {({ values, errors, touched, handleSubmit, handleBlur, handleChange }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="15px" // Reduced gap to save space
                                    gridTemplateColumns="repeat(2, 1fr)"
                                    sx={{
                                        "& > div": {
                                            gridColumn: isNonMobile ? undefined : "span 2", // Make fields span 2 columns on mobile
                                            width: "100%", // Ensure full width inside the grid
                                        },
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="First Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name="firstName"
                                        error={!!touched.firstName && !!errors.firstName}
                                        helperText={touched.firstName && errors.firstName}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Last Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name="lastName"
                                        error={!!touched.lastName && !!errors.lastName}
                                        helperText={touched.lastName && errors.lastName}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="email"
                                        label="Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        error={!!touched.email && !!errors.email}
                                        helperText={touched.email && errors.email}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Contact"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.contact}
                                        name="contact"
                                        error={!!touched.contact && !!errors.contact}
                                        helperText={touched.contact && errors.contact}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Address 1"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.address1}
                                        name="address1"
                                        error={!!touched.address1 && !!errors.address1}
                                        helperText={touched.address1 && errors.address1}
                                        sx={{ gridColumn: "span 2" }} // Span both columns
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Address 2"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.address2}
                                        name="address2"
                                        error={!!touched.address2 && !!errors.address2}
                                        helperText={touched.address2 && errors.address2}
                                        sx={{ gridColumn: "span 2" }} // Span both columns
                                    />
                                </Box>

                                <Box display="flex" justifyContent="end" mt="20px">
                                    <Button type="submit" variant="contained" color="secondary">
                                        Register User
                                    </Button>
                                </Box>
                                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                                    <Typography
                                        fullWidth
                                        mt="10px"
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        color="white"
                                        variant="h6"

                                    >
                                        <Typography></Typography>
                                        <Typography variant="body2" color="textSecondary">Have Already an account? Login here</Typography>

                                    </Typography>
                                </Link>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Paper>
        </Box>
    );
};

export default AddUser;
