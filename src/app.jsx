import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from './login/login';
import { Calendar } from './calendar/calendar';
import { About } from './about/about';


export default function App() {
    return (
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <header>
                    <nav>
                        <h1>ChoreChum</h1>
                        <button type="button" className="btn btn-outline-light"><NavLink to="/">Home</NavLink></button>
                        <button type="button" className="btn btn-outline-light"><NavLink to="/about">About</NavLink>
                        </button>
                        <button type="button" className="btn btn-outline-light"><NavLink to="/calendar">My
                            Calendar</NavLink></button>
                    </nav>
                    <br/>
                </header>

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/calendar' element={<Calendar />} />
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
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Adress unknown.</main>
}