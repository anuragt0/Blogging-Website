import {React, useState, useEffect} from 'react'
import { toast } from "react-hot-toast";


const ModalUpdate = (props) => {
    const [newBlog, setNewBlog] = useState({title: props.title, description: props.description});

    const onAddChange = (e)=>{
        setNewBlog({...newBlog,[e.target.name]: e.target.value});
    }
  useEffect(() => {
    setNewBlog({
      title: props.title ,
      description: props.description ,
    });
  }, [props.title, props.description]);

    const handleUpdateBlog = async ()=>{
        const response = await fetch(`http://localhost:4000/api/blog/update/${props.id}`, {
                    method: "PUT",
                    headers:{
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token")
                    },
                    body: JSON.stringify(newBlog)
                })
                const data = await response.json();
                if(data.success){
                    toast.success("Blog is updated successfully");
                    window.location.reload();
                }
                else{
                    toast.error("Something went wrong. Please login again");
                    // props.refClose1.click();
                }
        console.log(newBlog);
    }




  return (
    <div>
    <button
        ref={props.ref1}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-ff1" id="exampleModalLabel">
                Update Blog
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: "0.8rem" }}>
                <label htmlFor="title" className="modalLabel">
                  Title *
                </label>
                <input
                  type="text"
                  className="modalInput"
                  id="title"
                  name="title"
                  onChange={onAddChange}
                  value={newBlog.title}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="modalLabel">
                  Description *
                </label>

                <input
                  type="text"
                  className="modalInput"
                  id="description"
                  name="description"
                  onChange={onAddChange}
                  value={newBlog.description}
                  autoComplete="off"
                />
              </div>
              
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="modalCloseBtn"
                data-bs-dismiss="modal"
                ref={props.refClose1}
              >
                Close
              </button>
              <button
                onClick={handleUpdateBlog}
                type="button"
                className="modalAddBtn"
              >
                Update Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalUpdate