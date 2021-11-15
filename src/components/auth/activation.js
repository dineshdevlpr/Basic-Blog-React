import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import loader from '../../../src/loader.svg'

export default function ActivationCandidate(props){

    let [status,setStatus]=useState("");
    let history = useHistory();
    useEffect(()=>{
        async function fetchdata(token){
            let data = await fetch(`https://blog-basic-task.herokuapp.com/auth/activation/${token}`,{
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                }
            });
            if(data.status===200)
            setStatus("200");
            else
            setStatus(data.status.toString());
        }
        fetchdata(props.match.params.token);
    },[props.match.params.token]);
    return<>
        { status !== "200" ? <div className="text-center"><img src={loader} alt='redirecting'/><h5>Your Account is being activated...</h5></div> : history.push("/login") }

    </>
}