import { useState, useEffect } from "react";
import { Link , useHistory } from "react-router-dom";
import loader from '../../../src/loader.svg'

export default function ViewAllBlogs () {

    
    const history = useHistory();
    let [loading, setLoading] = useState(true)
    let [data, setdata] = useState([])
    const authToken = localStorage.getItem("authToken")
  
    useEffect( () => {
        async function fetchData() {
        let fetchData = await fetch("https://blog-basic-task.herokuapp.com/blog/viewblogs", {
          method: "GET",
          mode: 'cors',
          headers: {
            "Content-type": "application/json",
            "Authorization" : authToken
          },
        })
        let Blogs = await fetchData.json();
       
        setdata([...Blogs]);
        setLoading(false)
    }
    fetchData();
    }, [])
    
    return <>{ loading
        ?
        <div className="text-center"><img src={loader} alt='redirecting'/><h3>Loading Blogs</h3></div>
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
            <div class="row">
                {
                    data.map((obj) => {
                        return <div className="col-md-3 mt-2">
                            <div className="card  mb-3 d-flex align-items-stretch h-100" id="List__cards">
                                <div className="card-body text-dark" key ={obj._id}>
                                    <p className="card-text"><b><u>{obj.title}</u></b></p>
                                    <p className="card-text"><b>&nbsp; &nbsp; &nbsp;{obj.description}</b></p>
                                    <p className="card-text" style={{textAlign: "right"}}>-{obj.date} </p>
                                    <button className="btn btn-outline-success m-1" onClick={()=>history.push(`/viewblog/${obj._id}`)}>View Blog</button>
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