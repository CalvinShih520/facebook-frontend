import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import StyleNavbar from "../components/StyledNavbar";

const ShareLayout = () => {
    return (
        <>
            <StyleNavbar />
            <Outlet />
        </>
    );
};

export default ShareLayout