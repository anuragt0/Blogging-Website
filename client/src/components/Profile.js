import {React, useEffect, useState, useRef} from 'react'
import { toast } from "react-hot-toast";
import ModalUpdate from './ModalUpdate';
import "../css/profile.css"


const Profile = () => {
    const [currentBlog, setCurrentBlog] = useState({title: "", description: "", id: ""})
    const [userData, setUserData] = useState({});
    const [blogs, setBlogs] = useState([]);
    const ref = useRef(null);
    const refClose = useRef(null);

    useEffect(()=>{
        const getProfile = async ()=>{
            const response = await fetch("http://localhost:4000/api/user/profile", {
                    method: "GET",
                    headers:{
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token")
                    },
                })
                const data = await response.json();
                if(data.success){
                    setUserData(data.userDoc);
                    setBlogs(data.blogs);
                }
                else{
                    toast.error("Something went wrong. Please login again");
                }
        }
        getProfile();
    }, []);

    const handleUpdateBlog = (title, description, id)=>{
        setCurrentBlog({title, description, id});
          ref.current.click();
    }
    const handleDelete = async (id)=>{
        const response = await fetch(`http://localhost:4000/api/blog/delete/${id}`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        })
        const data = await response.json();
        if(data.success){
            toast.success("Blog is deleted successfully");
            window.location.reload();
        }
        else{
            toast.error("Something went wrong. Please login again");
        }
    }

  return (

    <div>
    <ModalUpdate ref1 = {ref} refClose1= {refClose} title = {currentBlog.title} description={currentBlog.description} id={currentBlog.id}  ></ModalUpdate>

        <div className="profile-container">
      <div className="profile-details">
        <h1>{userData.name}'s Profile</h1>
        <p>Email: {userData.email}</p>
      </div>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <div className="blog-options">
              <button onClick={()=>{handleDelete(blog._id)}}>Delete</button>
              {/* Add update functionality here */}
              <button style={{backgroundColor: "green"}} onClick={()=> handleUpdateBlog(blog.title, blog.description, blog._id)} >Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    </div>
  )
}

export default Profile