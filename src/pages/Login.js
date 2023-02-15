import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {setToken} from '../redux/tokenSlice';
import {setUser} from '../redux/userSlice';
import axios from '../api/axios';
import Cookies from "universal-cookie";

 
const cookies = new Cookies(); 

const Login = () => {
  const user = useSelector((state) => state.user.value); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleValue = (e) => {
    dispatch(setUser({ ...user, [e.target.name]: e.target.value }));
  };


  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.post("http://localhost:5500/auth/login",user);
       console.log(res.data)
      const data = await res.data;
      if(data.message==='User logged in successfully'){
      const token = "Bearer " + data.token;
        cookies.set("token", token, { path: "/", maxAge: 1000 * 60 * 60 * 24 });
         dispatch(setToken(token));
         navigate("/")
         toast.success("Logged In sucessfully");
      }
      if (res.data === "Incorrect Password") {
        toast.error(res.data);
      }
    } catch (err) {
      if (err.message === "Request failed with status code 401") {
        toast.error("Invalid user");
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="login">
      <div className="box m-3 p-5" style={{color: "green"}}>
        <h1 className="d-flex justify-content-center align-items-center flex-column">
          LOGIN IN
        </h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              className="form-control m-2 p-2"
              placeholder="username"
              autoComplete="off"
              value={user.username}
              name="username"
              onChange={handleValue}
              required
            />
          </div>
          <div>
            <input
              className="form-control m-2 p-2"
              placeholder="password"
              type="password"
              value={user.password}
              name="password"
              autoComplete="off"
              onChange={handleValue}
              required
            />
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column m-3">
            <button className="btn btn-success m-2" type="submit">
              Sign In
            </button>
            <button className="btn btn-light m-2"  type="submit">
              <Link to="/forgot" style={{color: "black"}}>Forget Password?</Link>
            </button>
            <button className="btn btn-light m-2"  type="submit">
              <Link to="/register" style={{color: "black"}}>REGISTER</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;