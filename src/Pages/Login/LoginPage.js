import React,{useState} from 'react'
import './Login.css';
import { inject, observer } from 'mobx-react';

import Stores from '../../Stores/StoreIdentifier';
import { Redirect } from 'react-router-dom';

function LoginPage(props) {
    const [email,setEmail] = useState("");
    const [isRedirect,setIsRedirect] = useState(false);

    async function onSubmit(){
        var res = await props.authStore.login({ email:email });
        if(res !== undefined){
            localStorage.setItem("TODOAPPJWTKEY",res.payload.jwtToken);
            setIsRedirect(true);
        }   
    }

    if(isRedirect) return <Redirect to="/" />
    return (
        <div className="login">
            <div className="login-triangle"></div>
            <h2 className="login-header">Login</h2>
            <div className="login-container">
                <p><input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email"></input></p>
                <p><input type="password" placeholder="Password"></input></p>
                <p><input type="submit" onClick={onSubmit} value="Log in"></input></p>
            </div>
        </div>
    )
}

export default inject(Stores.AuthStore)(observer(LoginPage));