import { createContext, useState, useEffect, Children } from "react"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import LodingSpiner from "../../scenes/Global/LoadingSpiner";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    console.log("AuthProvider initialized"); // Add this log

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null);
    const isLogedin = !!authTokens;
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const [userId,setUserId] = useState(null);
    const navigate = useNavigate();

    
    const loginUser = async (token) => {
        try {
          setLoginLoading(true); // Start spinner on login attempt
          const user = jwtDecode(token);
          
          
          
          console.log("Decoded user:", user);
          
          setAuthTokens(token);
          setUserId(user.id)

    
          // Save tokens and username to local storage
          localStorage.setItem("authTokens", JSON.stringify(token));
          localStorage.setItem("userId", user.id);
    
          navigate("/dashboard"); // Redirect to dashboard after successful login
        } catch (error) {
          console.error("Failed to decode token:", error);
        } finally {
          setLoginLoading(false); // Stop spinner after login attempt
        }
      };
      const logoutUser = () => {
        setAuthTokens(null);
 
        localStorage.removeItem("authTokens");
     
        navigate("/"); // Redirect to login page
      };
    

      useEffect(() => {
        const verifyToken = async () => {
          const storedTokens = localStorage.getItem("authTokens");
   
    
          if (storedTokens) {
            try {
              const parsedTokens = JSON.parse(storedTokens);
              const user = jwtDecode(parsedTokens);
              const currentTime = Math.floor(Date.now() / 1000);
    
              if (user.exp < currentTime) {
                console.log("Token expired, logging out.");
                logoutUser();
              } else {
                setAuthTokens(parsedTokens);
            
              }
            } catch (error) {
              console.error("Error decoding token:", error);
              logoutUser();
            }
          }
    
          setLoading(false); // Stop loading after token verification
        };
    
        verifyToken();
      }, []);
      console.log("USer idddd" + userId);

    let contextData = {
        authTokens,
        isLogedin,
        setAuthTokens,
        loginUser,
        logoutUser,
        loginLoading,
        userId,
    }


    return (
        <AuthContext.Provider value={contextData}>{loading ? <LodingSpiner /> : children}</AuthContext.Provider>
    )
}