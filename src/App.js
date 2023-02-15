import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import { ToastContainer } from "react-toastify";
import CreateBlog from "./components/CreateBlog";
import AllBlogs from "./components/AllBlogs";
import EditBlog from "./components/EditBlog";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";

// import Navbar from "./components/Navbar";

const App = () => {
  const token = useSelector((state) => state.token.value);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        theme={"light"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {/* Authenticated  Routes */}
        <Route index element={token ? <Home /> : <Login />} />
        <Route path="/create" element={token ? <CreateBlog /> : <Login />} />
        <Route path="/allblog" element={token ? <AllBlogs /> : <Login />} />
        <Route path="/:id" element={<EditBlog />} />

        {/* Unauthenticated Routes */}
        <Route path="/login" element={token ? <Home /> : <Login />} />
        <Route path="/register" element={token ? <Home /> : <Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset" element={<Reset />} /> 
      </Routes>
    </Router>
  );
};

export default App;