import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import discovericon from "../images/discovericon.png"
import mmlogo from "../images/mmlogo.png"
import homeicon from "../images/homeicon.png"
import posticon from "../images/posticon.png"
import profileicon from "../images/profileicon.png"
import logouticon from "../images/logouticon.png"

export const NavBar = () => {
    const navigate = useNavigate()
    
    return (
        <ul className="navbar">
            <li className="navbar__item__logo">
            <Link to="/home"><img src={mmlogo} className="navbar__item__logo__img"></img></Link>
            </li>
            <Link className="navbar__link" style={{textDecoration: 'none', color:'black'}} to={`/home`}>
                <img src={homeicon} className="navbar_icon"></img>
            </Link>
            <Link className="navbar__link" style={{textDecoration: 'none', color:'black'}} to={`/discover`}>
                <img src={discovericon} className="navbar_icon"></img>
            </Link>
            <Link className="navbar__link" style={{textDecoration: 'none', color:'black'}} to={`/create-post`}>
                <img src={posticon} className="navbar_icon"></img>
            </Link>
            <Link className="navbar__link" style={{textDecoration: 'none', color:'black'}} to={`/profile`}>
                <img src={profileicon} className="navbar_icon"></img>
            </Link>
            <Link className="navbar__link" style={{textDecoration: 'none', color:'black'}} to="" onClick={() => {
                    localStorage.removeItem("makers_user")
                    navigate("/", {replace: true})
                }}>
            <img src={logouticon} className="navbar_icon"></img></Link>
        </ul>
    )
}

