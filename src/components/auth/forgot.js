import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import loader from '../../../src/loader.svg'

export default function ForgotCandidate() {

    const [email, setEmail] = useState("");
    let [loading, setLoading] = useState(false)
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const fetchData = await fetch("https://blog-basic-task.herokuapp.com/auth/forgot", {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
          email
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
        if (fetchData.status === 200) {
        alert("Password reset link has been sent to your registered mail address. Check Spam folder as well")
        history.push("/login")
        }else {
            alert("Error Occured");
        }
    }


    return (
        <>{ loading
            ?
            <div className="text-center"><img src={loader} alt='redirecting'/><h5>Sending Password reset mail to your registered mail ID...</h5></div>
            :
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="col-md-12">
                            <form className="form" action="" method="post" onSubmit={handleSubmit}>
                                <h3 className="text-center text-primary">Forgot Password</h3>
                                <div className="form-group">
                                    <label for="email" className="text-primary">Email:</label><br/>
                                    <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="submit" name="submit" className="btn btn-info btn-md" value="submit" />
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