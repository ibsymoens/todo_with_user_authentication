import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/auth";
import { apiSignup, apiSignin } from "../api";

const initialState = {name: "", email: "", password: "", confirmPassword: ""}

const Auth = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [creds, setCreds] = useState(initialState);
    const [errMsg, setErrMsg] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup) {
            if(creds.password !== creds.confirmPassword) {
                setErrMsg("Password unmatch.");
                return;
            }

            apiSignup(creds)
                .then(res => dispatch(signup(res)))
                .catch(err => {
                    console.log(err);
                    setErrMsg(err?.response?.data?.message);
                });
        } else {
            apiSignin(creds)
                .then(res => dispatch(signup(res)))
                .catch(err => {
                    console.log(err);
                    setErrMsg(err?.response?.data?.message);
                });
        }
    }

    return (
        <>
            <h1 style={{ fontSize: "2rem"}}>{isSignup ? "Sign up" : "Sign in"}</h1>
            <form onSubmit={handleSubmit}>
                {isSignup && 
                    <input 
                        type="text" 
                        placeholder="Name"
                        name="name" 
                        onChange={(e) => setCreds({...creds, [e.target.name]: e.target.value})}
                        required />
                }
                <br />
                <input 
                    type="email" 
                    placeholder="Email" 
                    name="email"
                    onChange={(e) => setCreds({...creds, [e.target.name]: e.target.value})}
                    required/>
                <br />
                <input 
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    onChange={(e) => setCreds({...creds, [e.target.name]: e.target.value})}
                    required/>
                <br />
                {isSignup && 
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        name="confirmPassword"
                        onChange={(e) => setCreds({...creds, [e.target.name]: e.target.value})}
                        required />}
                <br />
                <button 
                    type="submit">{isSignup ? "Sign up" : "Sign in"}</button>
            </form>
            <button 
                style={{
                    background: "none",
                    outline: "none",
                    border: "none",
                    marginTop: "20px",
                    color: "#24a0ed"
                }}
                onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? "Click to sign in" : "Click to sign up"}</button>
            {errMsg !== "" ? <h3 style={{ marginTop: "10px", color: "#ff0000" }}>{errMsg}</h3> : null}
        </>
    );
}

export default Auth;