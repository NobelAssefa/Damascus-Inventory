import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import AuthContext from "../../../config/context/authContext";
import { login_user } from "../../../config/apiCalls/userApiCalls";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {

  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const initialValues = { email: "", password: "" };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const SubmitHandler = async (values) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await login_user(values.email, values.password);
      console.log("Response:", res);

      if (res.success && res.data) {
        loginUser(res.data.token); // Update auth context with the token
      } else {
        setError(res.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false); // Stop spinner
    }
  };

  return (
    <Box
      position="relative" // Relative positioning to handle absolute elements
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="0 20px"
    >
      {/* Logo positioned at the top left */}
      <Box
        position="absolute"
        top="20px"
        left="20px"
      >
        <img src="/assets/logoMain.png" alt="logo" style={{ width: "120px" }} />
      </Box>

      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
          bgcolor: colors.greenAccent[700],
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Box textAlign="center" mb={2}>
          <Typography variant="h4" color="textPrimary">
            Login User
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log("Formik onSubmit triggered");
            SubmitHandler(values);
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap="20px">
                <TextField
                 
                  label="Email"
                  name="email"
                  placeholder="Enter Email"
                  variant="standard"
                  fullWidth
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  label="Password"
                  name="password"
                  placeholder="Enter Password"
                  value={values.password}
                  type="password"
                  variant="standard"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />

                {error && (
                  <Typography color="error" variant="body2" textAlign="center">
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>

                <Box textAlign="center" mt={2}>
                  <Link to="/createUser" style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography variant="body2" color="textSecondary">
                      Don't have an account? Sign up here
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Login;
