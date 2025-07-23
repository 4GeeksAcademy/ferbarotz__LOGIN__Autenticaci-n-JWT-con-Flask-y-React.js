import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Form = () => {

  const { store, dispatch } = useGlobalReducer()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function sendData(e) {
    e.preventDefault();
    console.log("send data");
    console.log(email, password);
  

  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        "email": email,
        "password": password
      }
    )
  };

  fetch(import.meta.env.VITE_BACKEND_URL + '/api/login', requestOptions)
    .then((response) => {
      console.log(response.status)  
      if(response.status == 200){
        //pasa auth a true
        dispatch({ type: "set_auth", payload: true })  
      }
      return response.json()
    })
    .then(data => {
      localStorage.setItem('token', data.access_token);
      console.log(data)
    });
  }

 return (
    <div>
      <form className="w-50 mx-auto" onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword" placeholder="Password" />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Login</button>
        </div>


      </form>
    </div>
  );
};

export default Form;
