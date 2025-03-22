import React from 'react';

import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        console.log("Button Clicked");
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        console.log("Button Clicked");
        loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ username: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        }
        else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
        }
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
                    <div className="input-group mb-3">
                        <span className="input-group-text">@</span>
                        <input className="form-control" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='username'/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">🔒</span>
                        <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
                    </div>
                    <div className="buttons">
                    <Button type="submit" className="btn btn-primary" onClick={() => loginUser()} disabled={!userName || !password}>Login</Button>
                    <Button type="submit" className="btn btn-secondary" onClick={() => createUser()} disabled={!userName || !password}>Create</Button>
                    </div>
                </div>

                <div>{displayError}</div>
            </div>


        </main>
    );
}