import React, { useState } from 'react';

import './login.css';
import {useNavigate} from "react-router-dom";


export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        })
            .catch(() => {
                // Logout failed. Assuming offline
            })
            .finally(() => {
                localStorage.removeItem('userName');
                props.onLogout();
            });
    }

    return (
        <main>
            <div className="main-login">
                <div className="welcome">
                    <h2>Welcome to ChoreChum</h2>
                    <img src="/hugging.png" width="100" height="100" />
                        <br/>
                    <div>Good luck chumming, {props.userName || "Guest"}!</div>
                    <br />
                </div>
                <div className="logout">
                    <button onClick={() => navigate("/calendar")} className="btn btn-primary">Calendar</button>
                    <button className="btn btn-secondary" onClick={() => logout()}>Logout</button>
                </div>
            </div>

        </main>
    );
}