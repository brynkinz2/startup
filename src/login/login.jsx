import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

import './login.css';


export function Login({setUser}) {
    const [userName, setUsername] = React.useState(localStorage.getItem('user') || '');
    const navigate = useNavigate();
    function loginUser(e) {
        e.preventDefault();
        localStorage.setItem('user', userName);
        setUser(userName);
        navigate('/calendar');
    }

    function textChange(e) {
        setUsername(e.target.value);
    }

    return (
        <main>
            <div className="main-login">
                <div className="welcome">
                    <h2>Welcome to ChoreChum</h2>
                    <img src="/hugging.png" width="100" height="100" />
                        <br/>
                </div>
                <div className="login">
                    <form method="get" action="play.html">
                        <div className="input-group mb-3">
                            <span className="input-group-text">@</span>
                            <input className="form-control" type="text" placeholder="username" onChange={textChange}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">🔒</span>
                            <input className="form-control" type="password" placeholder="password"/>
                        </div>
                        <button onClick={loginUser} type="submit" className="btn btn-primary">Login</button>
                        <button type="submit" className="btn btn-secondary">Create</button>
                    </form>
                </div>
            </div>


        </main>
    );
}