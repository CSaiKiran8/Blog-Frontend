import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector,useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import axios from '../api/axios';

const Register = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleValue = (e) => {
    dispatch(setUser({ ...user, [e.target.name]: e.target.value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", user);
      if (res.data === "User created sucessfully") {
        toast.success("User created sucessfully");
        navigate('/login');
      }else{
        toast.error(res.data);
      }
    } catch (error) {
        toast.error(error);
    }
  };

  return (
    <div className="register">
      <div className="box m-3 p-5 bg-dark text-white">
        <h1 className="d-flex justify-content-center">REGISTER</h1>
        <form onSubmit={handleRegister}>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="from-group">
              <input
                className="form-control m-2 p-2"
                type="text"
                required
                autoComplete="off"
                placeholder="username"
                name="username"
                value={user.username}
                onChange={handleValue}
              />
            </div>
            <div className="from-group ">
              <input
                className="form-control m-2 p-2"
                type="email"
                required
                placeholder="email"
                name="email"
                value={user.email}
                onChange={handleValue}
              />
            </div>
            <div className="from-group ">
              <input
                className="form-control m-2 p-2"
                type="password"
                required
                placeholder="password"
                name="password"
                value={user.password}
                onChange={handleValue}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <button className="btn btn-primary m-2" type="submit">
              Register
            </button>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;