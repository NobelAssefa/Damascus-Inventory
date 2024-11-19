import Sidebar from "./scenes/Global/Sidebar";
import Topbar from "./scenes/Global/Top bar";
import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Dashboard from "./scenes/Dashboard"
import Users from "./scenes/Users"
import Products from "./scenes/Products";
import AddUser from "./scenes/Users/AddUser";
import AddProduct from "./scenes/Products/AddProduct";
import Calendar from "./scenes/Calendar";
import Barchart from "./scenes/Chart/BarChart";
import Piechart from "./scenes/Chart/PieChart";
import Linechart from "./scenes/Chart/LineChart";
import Geomap from "./scenes/Chart/Geomap";
import Login from "./scenes/Users/Login/login";
import AuthContext,{ AuthProvider } from "./config/context/authContext";
import PrivateRoutes from "./config/context/privateRoutes";
import LodingSpiner from "./scenes/Global/LoadingSpiner";
import { useNavigate } from "react-router-dom";

function App() {
  const [theme, coloMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate()
  const location = useLocation();
  const { authTokens, loginLoading, isLogedin } = useContext(AuthContext);
  const [showSide, setShowSide] = useState(false);
 
  useEffect(() => {
  
    if (authTokens && location.pathname !== "/") {
      setShowSide(true);
    } else {
      setShowSide(false);
    }
  }, [location.pathname, authTokens]);

  useEffect(() => {
    // Redirect authenticated users to dashboard if they visit the login page
    if (authTokens && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [authTokens, location.pathname, navigate]);

  if (loginLoading) {
    // Show loading spinner while waiting for authTokens
    return <LodingSpiner />;
  }
  return (

      <colorModeContext.Provider value={coloMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
          {authTokens && showSide && <Sidebar isSidebar={isSidebar} />}
            <main className="content">
            {authTokens && showSide && <Topbar setIsSidebar={setIsSidebar} />}
              <Routes>
            
                <Route path="/" element={<Login />} />
                <Route element={<PrivateRoutes />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/products" element={<Products />} />
                
                  <Route path="/createProduct" element={<AddProduct />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/barchart" element={<Barchart />} />
                  <Route path="/piechart" element={<Piechart />} />
                  <Route path="/linechart" element={<Linechart />} />
                  <Route path="/geomap" element={<Geomap />} />
                </Route>
                <Route path="/createUser" element={<AddUser />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </colorModeContext.Provider>

  );
}


export default App;
