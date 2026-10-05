import { Link } from "react-router-dom"

function MenuHeader(){
    return(
       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
             <a className="navbar-brand" href="/">React Tutorial </a>

               <ul className="navbar-nav">
                <li className="nav-item">
                   <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
                </li>
                <li className="nav-item">
                   <Link className="nav-link" to={"/"}>Home</Link>
                </li>
                  <li className="nav-item">
                   <Link className="nav-link" to={"/about"}>About</Link>
                   
                </li>
                  <li className="nav-item">
                   <Link className="nav-link" to={"/contact"}>Contact</Link>
                </li>
                <li className="nav-item">
                   <Link className="nav-link" to={"/employee"}>Employee</Link>
                </li>
                <li className="nav-item">
                   <Link className="nav-link" to={"/employeecards"}>Employee Cards</Link>
                </li>

               </ul>
          </div>
       </nav>
    )
}
export default MenuHeader