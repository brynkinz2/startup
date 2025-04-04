import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import { Login } from './login/login';
import { Calendar } from './calendar/calendar';
import { About } from './about/about';
import { AuthState } from './login/authState';
// import {response} from "express";


export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [backendData, setBackendData] = React.useState([{}]);

    return (
        <BrowserRouter>
            <div className='body'>
                <header>
                    <h1>ChoreChum</h1>
                    <nav>
                        <button type="button" className="btn btn-outline-light"><NavLink to="/">Home</NavLink></button>
                        <button type="button" className="btn btn-outline-light"><NavLink to="/about">About</NavLink>
                        </button>
                        {userName && <button type="button" className="btn btn-outline-light"><NavLink to="/calendar">My
                            Calendar</NavLink></button>}
                    </nav>
                    <div className='username'>{userName}</div>
                    <br/>
                </header>

                <Routes>
                    <Route
                        path='/'
                        element={
                            <Login
                                userName={userName}
                                authState={authState}
                                onAuthChange={(userName, authState) => {
                                    setAuthState(authState);
                                    setUserName(userName);
                                }}
                            />
                        }
                        exact
                    />
                    <Route path='/calendar' element={<Calendar userName={userName}/>} />
                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer>
                    <NavLink to="https://github.com/brynkinz2/startup.git">GitHub</NavLink>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>
}