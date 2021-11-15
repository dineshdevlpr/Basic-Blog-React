import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import loader from '../../../src/loader.svg'


export default function UpdateBlog(props) {

    const [blogID , setBlogId] = useState("");
    const [author , setAuthor] = useState("");
    const [category , setCategory] = useState("");
    const [title , setTitle] = useState("");
    const [image , setImage] = useState();
    const [description, setDescription] = useState("");

    const authToken = localStorage.getItem("authToken")
    let [loading, setLoading] = useState(false)
    const history = useHistory();
    let id = props.match.params.id


    if (!authToken){
        alert("No Token Found. Try Log in.")
        history.push("/login")
    }

    var formData = new FormData();
    formData.append("blogID", blogID);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('title', title);
    formData.append('image', image);
    formData.append('description', description);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await fetch(`https://blog-basic-task.herokuapp.com/blog/updateblog/${id}`, {
        method: "PUT",
        mode: 'cors',
        body: formData,
        headers: {
            "Authorization" : authToken
        },
      })
      .then(response => response.json())
      .then(data => {
        alert("Blog Successfully Updated")
        history.push("/viewallblogs")
      })
      .catch((error) => {
          console.log(error)
          alert("Error Occured")
          history.push("/dashboard")
        console.error('Error:', error);
      });
    
    }

    return (
        <>{ loading
            ?
            <div className="text-center"><img src={loader} alt='redirecting'/><h5>Updating Blog...</h5></div>
            :
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="col-md-12">
                            <form className="form" action="" method="post" onSubmit={handleSubmit} >
                                <h3 className="text-center text-info">Create Blog</h3>
                                <div className="form-group">
                                    <label for="blogId" className="text-info">Enter Blog ID</label><br/>
                                    <input type="text" id="blogId" name="blogId" required onChange={(e) => setBlogId(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label for="author" className="text-info">Enter Author Name</label><br/>
                                    <input type="text" id="author" name="author" required onChange={(e) => setAuthor(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label for="title" className="text-info">Enter Title</label><br/>
                                    <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label for="category" className="text-info">Enter Category</label><br/>
                                    <input type="text" id="category" name="category" required onChange={(e) => setCategory(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label for="image" className="text-info">Choose File<small>&nbsp;(png, jpg or jpeg)</small></label><br/>
                                    <input type="file" id="image" accept=".png, .jpg, .jpeg" name="image" required onChange={(e) => setImage(e.target.files[0])} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label for="description" className="text-info">Enter Content</label><br/>
                                    <textarea type="text" id="description" name="description" required onChange={(e) => setDescription(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="submit" name="submit" className="btn btn-info btn-md" value="Update" />
                                </div>
                                <div className="form-group">
                                    <Link to="/dashboard" className="text-muted">Click Here to go to Dashboard</Link><br/> <br/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}