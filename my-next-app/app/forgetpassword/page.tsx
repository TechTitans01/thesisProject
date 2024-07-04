"use client"

import React, { useState } from 'react';
import '../styles/forgetpass.css'; // Ensure you link to your stylesheet
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
const AccountRecovery = () => {
const[email,seteamil]=useState<string>("")
const forget=()=>{
  axios.post("http://localhost:8080/api/user/getoneByemail",{
    email:email
  }).then((res)=>{
    toast.success("succes")
    console.log(res)
  })
  .catch((err)=>{console.log(err)
    toast.error("error")
  })
}

  return (<>
    <div className="account-recovery">
      <h2>Trouvez votre compte</h2>
      <p>Veuillez entrer votre e-mail ou votre numéro de mobile pour rechercher votre compte.</p>
      <input type="text" placeholder="E-mail ou numéro de mobile" onChange={(e)=>seteamil(e.target.value)} />
      <div className="buttons">
        <button className="cancel">Annuler</button>
        <button className="search" onClick={()=>{forget()}}>Rechercher</button>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default AccountRecovery;