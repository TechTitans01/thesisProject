import React from 'react';
import "../styles/verifycode.css"

export default function Seecurity (){


  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  const handleContinue = () => {
    console.log('Continue clicked');
  };

  return (
    <div className="container">
      <h2>Entrez le code de sécurité</h2>
      <p>Merci de vérifier dans vos e-mails que vous avez reçu un message avec votre code. Celui-ci est composé de 6 chiffres.</p>
      <div className="input-group">
        <input placeholder="Entrez le code" />
        <p className="email-info">Nous avons envoyé votre code à : <br /> ahmed.gafsi.2001@gmail.com</p>
      </div>
      <div className="buttons">
        <button>close</button>
        <button>Continue</button>
      </div>
      <a href="#" className="resend-code">Code non reçu ?</a>
    </div>
  );
};

;
