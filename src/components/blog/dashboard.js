import React from 'react'
import { Link } from "react-router-dom";

export default function Dashboard(){
    return <div className="text-center mt-5">
        <h1>
            <Link to="/createblog" className="text-muted">Create Blog</Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Link to="/viewallblogs" className="text-muted">View Blogs</Link>
        </h1>
    </div>
}