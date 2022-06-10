import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBlogs } from "../redux/blogsSlice";
import { setName } from "../redux/nameSlice";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from '../api/axios';
import ago from "ts-ago";


const Blog = () => {
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.value);
  
  
  const delHandler = async (id) => {
    try {
      const res = await axios.delete(`/blog/${id}`, {
        headers: { authorization: token },
      });
      toast.success(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const load = async () => {
      const { data } = await axios.get("/blog/user", {
        headers: { authorization: token },
      });
      dispatch(setBlogs(data.blogs));
      dispatch(setName(data.name));
    };
    load();
  });

  return (
    <div className="con">
      <div className="blog">
        {blogs.map((blog, i) => (
          <div className="card mb-1" key={i}>
           {blog.image &&  <img src={blog.image} className="card-img-top" alt="..." />}
            <Link to={`/${blog._id}`}>
              <EditIcon className='edit' color="primary" />
            </Link> 
            <div className="card-body">
              <h5 className="card-title">{blog.title}</h5>
              <p className="card-text">{blog.desc}</p>
              <span>Posted by {blog.name}</span>
              <p className="card-text">
                <small className="text-muted">{ago(blog.createdAt)}</small>
              </p>
            </div>
            <DeleteIcon className="del" color='error' onClick={() => delHandler(blog._id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;