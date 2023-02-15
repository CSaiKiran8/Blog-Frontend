import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBlogs } from "../redux/blogsSlice";
import { setName } from "../redux/nameSlice";
import { toast } from "react-toastify";
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone'; 
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import axios from '../api/axios';
import ago from "ts-ago";


const Blog = () => {
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.value);
  
  
  const delHandler = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/blog/${id}`, {
        headers: { authorization: token },
      });
      toast.success(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const load = async () => {
      const { data } = await axios.get("http://localhost:5500/blog/user", {
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

            <div className="card-body" style={{backgroundColor: '#ffffb9'}}>
              <h5 className="card-title">{blog.title}</h5>
              <Link to={`/${blog._id}`} style={{color: 'black'}}>
                <ModeEditTwoToneIcon className='edit' color='dark' />
              </Link> 
              <p className="card-text">{blog.desc}</p>
              <DeleteTwoToneIcon className="del" color='black' onClick={() => delHandler(blog._id)} />
              <span>Posted by {blog.name}</span>
              <p className="card-text">
                <small className="text-muted">{ago(blog.createdAt)}</small>
              </p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;