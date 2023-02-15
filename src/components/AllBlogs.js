import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBlogs } from "../redux/blogsSlice";
import Navbar from "./Navbar";
import axios from '../api/axios';
import ago from "ts-ago";

const AllBlogs = () => {
  const token = useSelector((state) => state.token.value);
  const blogs = useSelector((state) => state.blogs.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const { data } = await axios.get("http://localhost:5500/blog", {
        headers: { authorization: token },
      });
      dispatch(setBlogs(data));
    };
    load();
  }, [token, dispatch]);

  return (
    <>
      <Navbar />
      <div className="con">
        <div className="blog">
          {blogs.map((blog, i) => (
            <div className="card mb-3" key={i}>
              {blog.image &&  <img src={blog.image} className="card-img-top" alt="..." />}
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.desc}</p>
                <span>Posted by {blog.name}</span>
                <p className="card-text">
                  <small className="text-muted">{ago(blog.createdAt)}</small>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllBlogs;