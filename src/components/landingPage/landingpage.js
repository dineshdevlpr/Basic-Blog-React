import React from 'react'
import { Link } from "react-router-dom";

export default function LandingPage(){
    return <div className="text-center mt-4">
    <h1>
    <Link to="/login" className="text-muted">Login</Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <Link to="/register" className="text-muted">Register</Link>
    </h1>
    </div>
}