import { Outlet } from "react-router-dom";
import StyleNavbar from "../components/StyledNavbar";

const ShareLayout = ({ currentUser, logOut }) => {
    return (
        <>
            <StyleNavbar currentUser={currentUser} logOut={logOut} />
            <Outlet />
        </>
    );
};

export default ShareLayout