import { toast } from "react-toastify";
import { useParams,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import {setBlog} from '../redux/blogSlice';
import Navbar from './Navbar';
import axios from '../api/axios';

const EditBlog = () => {
  
  const blog = useSelector((state) => state.blog.value);
  const token = useSelector((state) => state.token.value);
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`http://localhost:5500/blog/${id}`,blog,{ headers: { authorization: token }}) 
      toast.success(data);
      navigate('/');
    } catch (error) {
      toast.error(error);
    }
  }

  const handleValue = (e) => {
    dispatch(setBlog({ ...blog, [e.target.name]: e.target.value }));
  };

  return (
    <>
    <Navbar/>
    <div className="con">
    <form className='d-flex justify-content-center flex-column' onSubmit={handleSubmit}>
        <div className='from-group'>
          <input
            type="text"
            className="form-control m-3 p-3"
            placeholder="Title"
            name='title'
            autoFocus={true}
            value={blog.title}
            onChange={handleValue}
           />
        </div>
        <div className='from-group'>
          <textarea
            placeholder="Description"
            className="form-control m-3 p-3"
            type="text"
            name='desc'
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
            <button className="btn btn-success m-2" type="submit">
              Submit
            </button>
          </div>
    </form>
  </div>
  </>
  )
}

export default EditBlog