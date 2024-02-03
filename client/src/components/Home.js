import {React, useEffect, useState} from 'react'

const Home = () => {
    const [blogs, setBlogs] = useState([]);

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


  return (
    <>
    <h1 className="text-center mt-5">Welcome to BlogSite!</h1>
    {
       blogs.map((blog,  index)=>{
            return (
                <div key={index}>
                <h1>{blog.title}</h1>
                <h3>{blog.description}</h3>
                </div>
            )
        }) 
    }

    </>
  )
}

export default Home