import { useState, useEffect } from "react";
import { Link , useHistory } from "react-router-dom";
import loader from '../../../src/loader.svg'
import blog from '../../../src/blog.png'

export default function ViewBlog (props) {

    
    const history = useHistory();
    let [loading, setLoading] = useState(true)
    let [data, setdata] = useState([])
    const authToken = localStorage.getItem("authToken")
    let id = props.match.params.id
  
    useEffect( () => {
        async function fetchData() {
        let fetchData = await fetch(`https://blog-basic-task.herokuapp.com/blog/viewblog/${id}`, {
          method: "GET",
          mode: 'cors',
          headers: {
            "Authorization" : authToken
          },
        })
        let Blogs = await fetchData.json();
       
        setdata([Blogs]);
        setLoading(false)
    }
    fetchData();
    }, [])
    
    return <>
        { loading
        ?
        <div className="text-center"><img src={loader} alt='redirecting'/><h3>Loading Blog</h3></div>
        :
        <div className="container" id="List__Container">
            <div className="row">
                <div className="col-lg-12 text-center mt-4 ">
                    <div className="card">
                        <div className="card-body">
                        <h1>Blog-Basic</h1>
                        <Link to="/dashboard" className="text-muted">Home</Link>
                        </div>              
                    </div>             
                </div>
            </div>
         <br/>
            <div className="row">
                {
                    data.map((obj) => {
                        return <div className="col-md-3 mt-2">
                            <div className=" mb-3 d-flex align-items-stretch h-100" id="List__cards">
                                <div className="text-dark" key ={obj._id}>
                                    <p className="blogid">Blog ID : {obj.blogId} </p>
                                    <p className="category">Category : {obj.category} </p>
                                    <p className="author">Author : {obj.author} </p>
                                    {/* <img className="img" src={obj.image} alt="img"/> */}
                                    <img className="img" src={blog} alt="img"/>
                                    <p className="title"><b><u>{obj.title}</u></b></p>
                                    <p className="description"><b>&nbsp; &nbsp; &nbsp;{obj.description}</b></p>
                                    <p className="date" style={{textAlign: "right"}}>-{obj.date} </p>
                                    <button className="btn btn-outline-primary m-1" onClick={()=>history.push(`/updateblog/${obj._id}`)}>Update Blog</button>
                                    <button className="btn btn-outline-danger m-1" onClick={()=>history.push(`/deleteblog/${obj._id}`)}>Delete Blog</button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    }
    </>
}