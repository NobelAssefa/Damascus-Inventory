import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {Menu} from "@mui/material";
import {MenuItem} from "@mui/material";
import { useContext } from "react";
import { colorModeContext, tokens } from "../../../theme";
import InputBase from "@mui/material/InputBase";
import { LightModeOutlined } from "@mui/icons-material";
import { DarkModeOutlined } from "@mui/icons-material";
import { NotificationsOutlined } from "@mui/icons-material";
import { SettingsOutlined } from "@mui/icons-material";
import { PersonOutlined } from "@mui/icons-material";
import { SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../config/context/authContext";
const Topbar = () => {

    const theme = useTheme()
    const authctx = useContext(AuthContext)
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(colorModeContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const logouthandler = () => {
        setAnchorEl(null);

        authctx.logoutUser();
        navigate(0);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2}>

            {/*SEARCH BAR */}
            <Box display="flex" bgcolor={colors.primary[400]} borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchOutlined />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlined />
                    ) : (
                        <LightModeOutlined />
                    )}


                </IconButton>
                <IconButton>
                    <NotificationsOutlined />
                </IconButton>
                <IconButton>
                    <SettingsOutlined />
                </IconButton>
                <div className="personlogo">
                    <IconButton size="small" onClick={handleMenu}>
                        <PersonOutlined />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={logouthandler}>logout</MenuItem>
                        <MenuItem >Profile</MenuItem>

                    </Menu>
                </div>


                <Menu>
                    <MenuItem>


                    </MenuItem>
                </Menu>

            </Box>
        </Box>
    )
}

export default Topbar;