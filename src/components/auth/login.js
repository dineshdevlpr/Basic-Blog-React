import React, { useState  } from 'react'
import { Link, useHistory } from "react-router-dom";
import loader from '../../../src/loader.svg'


export default function LoginCandidate() {

    const [email, setEmail] = useState("");
    let [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("");
    // const[user, setUser] =useState()
    const history = useHistory();
    //check if the user already logged in
    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("user");
    //     if (loggedInUser) {
    //       const foundUser = JSON.parse(loggedInUser);
    //       setUser(foundUser);
    //     }
    //   }, []);

      
    const handleSubmit = async (e) => {
        e.preventDefault();
        // let user = {email, password}
        setLoading(true)
        const res = await fetch("https://blog-basic-task.herokuapp.com/auth/login/",  {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          "Content-type": "application/json",
        }
      }).then(response => response.json())
      .then(response => {
        localStorage.setItem("authToken", `${response.authToken}`);
        console.log(response.authToken)
        if(response.authToken){
            alert("Successfully Logged In")
            history.push("/dashboard")
        }else{
            alert("Login Failed")
            history.push("/register")
        }
      })
      .catch(error => {
         console.log(error)
         history.push("/register")
      });
      

        // if(res.status===200){
        //     console.log(res)
        //     localStorage.setItem("authToken", `${res.authToken}`);
        //     console.log(res.authToken)
        //     alert("Successfully Logged In")
        //     history.push("/dashboard")
        // }else{
        //     alert("Login Failed")
        //     history.push("/register")
        // }
        // setUser(res.data);
        // store the user in localStorage
        // localStorage.setItem("user", JSON.stringify(res.data));
      
    }


    return (
        <>{ loading
            ?
            <div className="text-center"><img src={loader} alt='redirecting'/><h5>Logging In...</h5></div>
            :
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="col-md-12">
                            <form className="form" action="" method="post" onSubmit={handleSubmit}>
                                <h3 className="text-center text-primary">Login</h3>
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
                                    <Link to="/forgot" className="text-muted">Forgot Password ?</Link> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <Link to="/register" className="text-muted">New User ? Click here to Register</Link><br/> <br/>
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