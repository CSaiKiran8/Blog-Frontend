import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/tokenSlice";
import { setName } from "../redux/nameSlice";
import {setUser} from '../redux/userSlice';
import Cookies from "universal-cookie";
import { useNavigate, Link } from "react-router-dom";

const cookies = new Cookies();

const Navbar = () => {

  const dispatch = useDispatch();
  const name = useSelector((state) => state.name.value);
  const token = useSelector((state) => state.token.value);
  const navigate = useNavigate();

  const handleLogout = async () => {
    cookies.remove("token");
    dispatch(setToken(null));
    dispatch(setName(null));
    dispatch(setUser(""));
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-secondary" > 
      <div className="container-fluid">
        <Link to='' className="navbar-brand" style={{ color: "#ff00ff" }}>
          Blog App
        </Link>
        <Link to='#' className="navbar-brand" style={{ color: "#00ffff" }}>
          {`Hi👋, Welcome ${name}😊`}
        </Link>
        <button
          className="navbar-toggler"  
          type="button"
          color='primary'
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-primary"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto" >
            <li className="nav-item" >
              <Link className="nav-link active" style={{ color: "#00ffff" }} aria-current="page" to="/">
                MyBlogs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" style={{ color: "#00ffff" }}aria-current="page" to="/allblog">
                AllBlogs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" style={{ color: "#00ffff" }}aria-current="page" to="/create">
                AddBlog
              </Link>
            </li>
          </ul>
          {token ? (
                <button
                  className="btn"
                  title="Logout"
                  onClick={handleLogout}
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Logout
                </button>
              ) : (
                ""
              )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;