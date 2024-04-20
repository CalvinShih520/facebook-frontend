import { Link } from "react-router-dom";
const About = () => {
    return(
        <section className="section">
            <h2>About</h2>
            <h4>功能</h4>
            <li>個人資訊管理</li>
            <Link to='/' className="btn">Back Home</Link>
        </section>
    );
};

export default About