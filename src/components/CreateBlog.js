import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setBlog } from "../redux/blogSlice";
import {useNavigate} from 'react-router-dom'
import Navbar from "./Navbar";
import axios from "../api/axios";

const CreateBlog = () => {
  const blog = useSelector((state) => state.blog.value);
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5500/blog", blog, {
        headers: { authorization: token },
      });
      toast.success(data);
      navigate('/');
    } catch (error) {
      toast.error(error);
    }
  };

  const handleValue = (e) => {
    dispatch(setBlog({ ...blog, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Navbar />
      <div className="con">
        <form
          className="d-flex justify-content-center flex-column"
          onSubmit={handleSubmit}
        >
          <div className="from-group">
            <input
              type="text"
              className="form-control m-3 p-3 writeInput"
              placeholder="Title"
              name="title"
              autoFocus={true}
              value={blog.title}
              onChange={handleValue}
            />
          </div>
          <div className="from-group">
            <textarea
              placeholder="Description" 
              className="form-control m-3 p-3 writeInput"
              type="text"
              name="desc"
              value={blog.desc}
              onChange={handleValue}
            ></textarea>
          </div>
          <div className="from-group">
            <input
              type="text"
              className="form-control m-3 p-3"
              placeholder="Image URL"
              name="image"
              autoFocus={true}
              value={blog.image}
              onChange={handleValue}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <button className="btn btn-danger m-2" type="submit">
              Post Your Blog
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;