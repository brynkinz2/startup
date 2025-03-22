import React from 'react';

import './login.css';
import { Unauthenticated } from './unauthenticated';
import { AuthState } from './authState';
import {Authenticated} from "./Authenticated";


export function Login({ userName, authState, onAuthChange }) {
    return (
        <div>
            {authState !== AuthState.Unknown}
            {authState === AuthState.Authenticated && (
                <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
            )}
            {authState === AuthState.Unauthenticated && (
                <Unauthenticated
                    userName={userName}
                    onLogin={(loginUserName) => {
                        onAuthChange(loginUserName, AuthState.Authenticated);
                    }}
                />
            )}
        </div>
    );
}