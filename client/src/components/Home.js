import {React, useEffect, useState, useRef} from 'react'
import "../css/home.css"
import Modal from './Modal';

const Home = () => {
    
    const [blogs, setBlogs] = useState([]);

    const ref = useRef(null);
  const refClose = useRef(null);

    useEffect(()=>{
        const getBlogs = async ()=>{
            const response = await fetch("http://localhost:4000/api/blog/all", {
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
            })
            const data = await response.json();
            setBlogs(data.blogs);
        }
        getBlogs();
    }, []);

    const handleClickCreate = ()=>{
        ref.current.click();
    }


  return (
    <>

    {<Modal ref1 = {ref} refClose1= {refClose}/>}

    <h1 className="text-center mt-5">Welcome to BlogSite!</h1>

    <button onClick={handleClickCreate}>Create a blog</button>
        <div className="blog-list">
      {blogs && blogs.map((blog) => (
        <div key={blog._id} className="blog-item">
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
          <div className="blog-meta">
            <span className="username">{blog.createdBy}</span>
            <span className="time">{blog.time}</span>
          </div>
        </div>
      ))}
    </div>


    </>
  )
}

export default Home