import { Outlet } from "react-router-dom";

const ShareProductLayout = () => {
    return (
        <section className="section">
            <h2>products</h2>
            <h4>功能</h4>
            <li>商品列表</li>
            <li>購物車</li>
            <Outlet />
        </section>
    );
};
export default ShareProductLayout;