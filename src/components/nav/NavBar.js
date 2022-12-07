import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import mmlogo from "../images/mmlogo.png"

export const NavBar = () => {
    const navigate = useNavigate()
    
    return (
        <ul className="navbar">
            <Link className="navbar__link" style={{textDecoration: 'none', color:'black'}} to={`/home`}>
            <li className="navbar__item">
                home
            </li></Link>
            <Link className="navbar__link" style={{textDecoration: 'none', color:'black'}} to={`/discover`}>
            <li className="navbar__item">
                discover
            </li></Link>
            <li className="navbar__item__logo">
            <img src={mmlogo} className="navbar__item__logo__img"></img>
            </li>
            <Link className="navbar__link" style={{textDecoration: 'none', color:'black'}} to={`/sell`}>
            <li className="navbar__item">sell
            </li></Link>
            <Link className="navbar__link" style={{textDecoration: 'none', color:'black'}} to="" onClick={() => {
                    localStorage.removeItem("makers_user")
                    navigate("/", {replace: true})
                }}>
            <li className="navbar__item navbar__logout">
                logout
             </li></Link>
        </ul>
    )
}

