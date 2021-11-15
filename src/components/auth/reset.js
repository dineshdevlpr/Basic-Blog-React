import React, { useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import loader from '../../../src/loader.svg'

export default function ResetCandidate() {


    const [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false)
    const history = useHistory();
    const { randomString } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const fetchData = await fetch(`https://blog-basic-task.herokuapp.com/auth/reset/${randomString}`, {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
          password, randomString
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
        if (fetchData.status === 200) {
        alert("Password reset Successful")
        history.push("/login")
        }else {
            alert("Error Occured");
        }
    }


    return (
        <>{ loading
            ?
            <div className="text-center"><img src={loader} alt='redirecting'/><h5>Updating password...</h5></div>
            :
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div lassName="col-md-12">
                            <form className="form" action="" method="post" onSubmit={handleSubmit}>
                                <h3 className="text-center text-primary">Reset Password</h3>
                                <div className="form-group">
                                    <label for="password" className="text-primary">New Password:</label><br/>
                                    <input type="password" name="password" id="password" required onChange={(e) => setPassword(e.target.value)} className="form-control" />
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