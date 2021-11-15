import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import loader from '../../../src/loader.svg'

export default function DeleteJob(props){

    let [status,setStatus]=useState("");
    const authToken = localStorage.getItem("authToken")
    let id = props.match.params.id
    let history = useHistory();
    useEffect(()=>{
        async function fetchdata(){
            let data = await fetch(`https://blog-basic-task.herokuapp.com/blog/deleteblog/${id}`,{
                method: "DELETE",
                mode: 'cors',
                headers: {
                  "Content-type": "application/json",
                  "Authorization" : authToken
                },
            });
            if(data.status===200){
            alert("Blog Successfully deleted")
            setStatus("200");
            }else
            setStatus(data.status.toString());
        }
        fetchdata();
    },[]);
    return<>
        { status !== "200"? <div className="text-center"><img src={loader} alt='deleting'/><h5>Deleting Blog...</h5></div> : history.push("/viewallblogs") }

    </>
}