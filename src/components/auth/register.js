import React, { useState } from 'react'
import {Link , useHistory} from "react-router-dom";
import loader from '../../../src/loader.svg'

export default function RegisterCandidate() {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    let [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const fetchData = await fetch("https://blog-basic-task.herokuapp.com/auth/register", {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
        firstname, lastname,
          email,
          password
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (fetchData.status === 200) {
        alert("Check Your Mail for Activation Link")
        history.push("/login")
    }else if(fetchData.status===400) {
        alert("Email ID already registered.. Try Logging in")
        history.push("/candidate/login")
    } else if(fetchData.status===500){
        alert("Internal Server Error")
        history.push("/landingpage")
    }
    }
    
    return (
        <>{ loading
            ?
            <div className="text-center"><img src={loader} alt='redirecting'/><h5>Registering Candidate...</h5></div>
            :
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="col-md-12">
                            <form className="form" action="" method="post" onSubmit={handleSubmit}>
                                <h3 className="text-center text-primary">Register as Candidate</h3>
                                <div className="form-group">
                                    <label for="firstname" className="text-primary">First Name:</label><br/>
                                    <input type="text" id="firstname" name="firstname" required onChange={(e) => setFirstName(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label for="lastname" className="text-primary">Last Name:</label><br/>
                                    <input type="text" id="lastname" name="lastname" required onChange={(e) => setLastName(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label for="email" className="text-primary">Email:</label><br/>
                                    <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label for="password" className="text-primary">Password:</label><br/>
                                    <input type="password" name="password" id="password" required onChange={(e) => setPassword(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="submit" name="submit" className="btn btn-info btn-md" value="submit" />
                                </div>
                                <div className="form-group">
                                    <Link to="/login" className="text-muted">Already Registered ? Click here to Login</Link><br/> <br/>
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