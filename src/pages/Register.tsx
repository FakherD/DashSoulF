import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [emailaddress, setEmailaddress] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
       
        const response =await fetch('http://django-service.default.svc.cluster.local:8001/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstname,
                lastname,
                emailaddress,
                password
            })
        });

        const content = await response.json();
        
        // Set redirect based on response or other condition
        if (content.success) { // Assuming your API returns a success field
            setRedirect(true);
        }
    }
    if (redirect) {
        return <Navigate to="/login" replace />;
    }
    
    return (
        <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Create Account</h1>

          <input type="firstname" className="form-control" placeholder="First Name" required 
                onChange={e => setFirstname(e.target.value)}
          />

          <input type="lastname" className="form-control" placeholder="Last Name" required 
                          onChange={e => setLastname(e.target.value)}
          />
          
          <input type="emailaddress" className="form-control" placeholder="Email Address" required 
                          onChange={e => setEmailaddress(e.target.value)}
          />
 
          <input type="password" className="form-control" placeholder="Password" required 
                          onChange={e => setPassword(e.target.value)}
          />

        <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      </form>
    );
};

export default Register;